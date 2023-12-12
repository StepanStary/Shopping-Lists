import React, { useState, useEffect } from 'react';
import List from './List';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid'; 
import { useTranslation } from 'react-i18next';

const SeznamListu = ({ selectedName, darkMode }) => {
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
      alert('Zvolte profil, než budete vytvářet seznam.');
    } else {
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
    }
  };

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
        <AddList>
          <ListInput
            type="text"
            value={novySeznam}
            onChange={handleInputChange}
            placeholder={t('newList')}
            required  // Pole je povinné
            minLength={1}  // Minimální délka
            maxLength={20}  // Maximální délka
            pattern="[a-zA-Z0-9\s]+"
          />
        <AddListButton onClick={handleAddSeznam}>{t('addList')}</AddListButton>
          </AddList>
          {seznamy.length > 0 ? (
            seznamy.map((seznam, index) => (
              <div className='lists' key={index}>
                <List
                  listName={seznam.name}
                  listId={seznam._id}
                  owner={seznam.owner}
                  items={seznam.items}
                  selectedName={selectedName}
                  darkMode={darkMode}
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
  margin-left: 2rem;
`;

const AddList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #2ecc71;
  padding: 1rem;
  margin: 0.5rem;
  width: 200px;
`;

const AddListButton = styled.button`
  margin-top: 1rem;
  border-radius: 5px;
  background-color: #2ecc71;
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

const ListInput = styled.input`
  margin-top: 5rem; 
  border-radius: 5px;
  max-width: 200px;
  padding: 0.5rem;
`;
