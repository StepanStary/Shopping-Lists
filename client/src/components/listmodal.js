import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ListModal = ({ isOpen, onRequestClose, listName, owner, listId }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/lists/${listId}/items`);
        if (!response.ok) {
          throw new Error('Chyba při načítání položek seznamu');
        }

        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (isOpen) {
      fetchItems();
    }
  }, [isOpen, listId]);

  const handleInputChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleAddItem = async () => {
    if (newItem.trim() !== '') {
      try {
        const response = await fetch(`http://localhost:3001/api/lists/${listId}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ item: newItem }),
        });

        if (!response.ok) {
          throw new Error('Chyba při přidávání položky');
        }

        const newItemData = await response.json();
        setItems([...items, newItemData]);
        setNewItem('');
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/lists/${listId}/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Chyba při mazání položky');
      }

      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="List Modal"
      style={customStyles}
    >
      <ModalHeader>
        <h2>{listName}</h2>
        <p>{t('createdBy')}{owner}</p>
      </ModalHeader>
      <ItemList>
        {items.map((item) => (
          <li key={item._id}>
            <ItemText>{item.item}</ItemText>
            <ButtonDel onClick={() => handleDeleteItem(item._id)}>{t('deleteItem')}</ButtonDel>
          </li>
        ))}
      </ItemList>
      <div>
        <NovaPolozka
          type="text"
          value={newItem}
          onChange={handleInputChange}
          placeholder={t('addItem')}
        />
        <Button onClick={handleAddItem}>{t('addItem')}</Button>
      </div>
    </Modal>
  );
};

export default ListModal;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 50vh;
  overflow: auto;
`;

const ItemText = styled.span`
  display: inline-block;
  max-width: 95vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 5px;
`;

const Button = styled.button`
  border-radius: 5px;
  background-color: #2980b9;
  color: #fff;
  padding: 0.5rem;
  margin-top: 0.5rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1a5276;
  }
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    maxHeight: '75vh',
    overflowY: 'auto',
  },
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  h2 {
    margin: 0;
  }

  p {
    margin: 0;
    color: #777;
  }
`;

const ButtonDel = styled.button`
  background-color: transparent;
  color: #e74c3c;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-left: auto;

  &:hover {
    border-color: #ae4e4e;
  }
`;

const NovaPolozka = styled.input`
  border-radius: 10px;
  margin-right: 5px;
  height: fit-content;
  max-width: 300px;
`;
