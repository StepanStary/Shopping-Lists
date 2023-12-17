import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ListModal = ({ isOpen, onRequestClose, listName, owner, listId, darkMode }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const { t } = useTranslation();

  const fetchItems = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/lists/${listId}/items`);
      if (!response.ok) {
        throw new Error('Chyba při načítání položek seznamu');
      }

      const data = await response.json();
      const initialCheckedItems = {};
      data.items.forEach((item) => {
        initialCheckedItems[item._id] = false;
      });
      setCheckedItems(initialCheckedItems);

      setItems(data.items);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCheckedItems = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/lists/${listId}/checked-items`);
      if (!response.ok) {
        throw new Error('Chyba při načítání stavu oznacených položek');
      }

      const data = await response.json();
      setCheckedItems(data.checkedItems);
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateCheckedItems = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/lists/${listId}/checked-items`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkedItems),
      });

      if (!response.ok) {
        throw new Error('Chyba při aktualizaci stavu oznacených položek');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchItems();
      fetchCheckedItems();
    }
  }, [isOpen, listId]);

  useEffect(() => {
    updateCheckedItems();
  }, [checkedItems]);

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
        setCheckedItems((prevCheckedItems) => ({
          ...prevCheckedItems,
          [newItemData._id]: false,
        }));
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
      style={{
        ...customStyles,
        content: {
          ...customStyles.content,
          backgroundColor: darkMode ? '#333' : '#fff',
        },
        overlay: {
          ...customStyles.overlay,
          backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        },
      }}
    >
      <ModalHeader>
        <h2 style={{ color: darkMode ? '#fff' : '#000' }}>{listName}</h2>
        <p style={{ color: darkMode ? '#fff' : '#000' }}>{t('createdBy')}{owner}</p>
      </ModalHeader>
      <ItemList>
        {items.map((item) => (
          <li key={item._id}>
            <input
              type="checkbox"
              checked={checkedItems[item._id]}
              onChange={() =>
                setCheckedItems((prevCheckedItems) => ({
                  ...prevCheckedItems,
                  [item._id]: !prevCheckedItems[item._id],
                }))
              }
            />
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
          required
          minLength={1}
          maxLength={80}
          pattern="[a-zA-Z0-9\s]+"
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
    overflowY: 'auto',
    padding: '20px',  // Přidejte polštáře pro lepší vzhled

    // Přidání media queries pro různé velikosti obrazovky
    '@media (minWidth: 600px)': {
      width: '60%',
    },
    '@media (minWidth: 768px)': {
      width: '50%',
    },
    '@media (minWidth: 992px)': {
      width: '40%',
    },
    '@media (minWidth: 1200px)': {
      width: '30%',
    },
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
  padding: 0.5rem;
`;
