import React, { useState, useEffect } from 'react';
import List from './List';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid'; 
import { useTranslation } from 'react-i18next';

const SeznamListu = ({ selectedName }) => {
  const [seznamy, setSeznamy] = useState([]);
  const [novySeznam, setNovySeznam] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/lists');
        if (!response.ok) {
          throw new Error('Chyba při načítání seznamů');
        }

        const data = await response.json();
        setSeznamy(data.lists);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedName]);

  const handleInputChange = (e) => {
    setNovySeznam(e.target.value);
  };

  const handleAddSeznam = async () => {
    if(selectedName === 'VyberProfil' || ''){
      alert('Zvolte profil, nez budete vytvářet seznam.');
    } else{
      try {
      if (novySeznam.trim() !== '') {
        const response = await fetch('http://localhost:3001/api/lists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: novySeznam, owner: selectedName, items: [], _id: uuidv4() }),
        });

        if (!response.ok) {
          throw new Error('Chyba při vytváření nového seznamu');
        }

        const newList = await response.json();
        setSeznamy([...seznamy, newList]);
        setNovySeznam('');

      }
    } catch (error) {
      setError(error.message);
    }
  }};

  const handleDeleteSeznam = async (index) => {
    try {
      const response = await fetch(`http://localhost:3001/api/lists/${seznamy[index]._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Chyba při mazání seznamu');
      }

      const updatedSeznamy = [...seznamy];
      updatedSeznamy.splice(index, 1);
      setSeznamy(updatedSeznamy);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateListName = async (index, newName) => {
    try {
      const response = await fetch(`http://localhost:3001/api/lists/${seznamy[index]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, _id: seznamy[index]._id }),
      });

      if (!response.ok) {
        throw new Error('Chyba při aktualizaci názvu seznamu');
      }

      const updatedSeznamy = [...seznamy];
      updatedSeznamy[index] = { ...updatedSeznamy[index], name: newName };
      setSeznamy(updatedSeznamy);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Wrapper>
    {error && <p>{error}</p>}
    {loading && <p>{t('loading')}</p>}
    {!loading && (
      <>
        <ButtonAdd onClick={handleAddSeznam}>{t('addList')}</ButtonAdd>
        <div>
          <TextHolder
            type="text"
            value={novySeznam}
            onChange={handleInputChange}
            placeholder={t('newList')}
          />
        </div>
        {seznamy.length > 0 ? (
          seznamy.map((seznam, index) => (
            <div className='lists' key={index}>
              <List
                listName={seznam.name}
                listId={seznam._id}
                owner={seznam.owner}
                items={seznam.items}
                selectedName={selectedName}
                onUpdateListName={(newName) => handleUpdateListName(index, newName)}
                onDeleteList={() => handleDeleteSeznam(index)}
                t={t}
              />
            </div>
          ))
        ) : (
          <p>{t('noLists')}</p>
        )}
      </>
    )}
  </Wrapper>
);
};

export default SeznamListu;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ButtonAdd = styled.button`
  max-width: 200px;
  max-height: 100px;
  border-radius: 5px;
  background-color: #2ecc71; /* Zelená barva pro tlačítko na přidání */
  color: #fff;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #27ae60;
  }
`;

const TextHolder = styled.input`
  margin-top: 25px;

`
