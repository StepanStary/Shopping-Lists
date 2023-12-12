// List.js
import React, { useState } from 'react';
import styled from 'styled-components';
import ListModal from './listmodal';
import { useTranslation } from 'react-i18next';

const List = ({ listName, selectedName, owner, onUpdateListName, onDeleteList, listId,darkMode }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { t } = useTranslation();
  
  const handleChangeListName = () => {
    if (owner === selectedName) {
      const newName = prompt('Zadejte nový název seznamu:', listName);
      if (newName !== null && newName.trim() !== '') {
        onUpdateListName(newName);
      }
    } else {
      alert('Nemáte oprávnění měnit název seznamu.');
    }
  };

  const handleDeleteList = () => {
    if(owner === 'VyberProfil'){
      alert('Zvolte profil, nez budete mazat seznam.');
    } else{
        if (owner === selectedName && window.confirm(`Opravdu chcete smazat seznam "${listName}"?`)) {
          onDeleteList();
        } else {
          alert('Nemáte oprávnění smazat seznam.');
        }
  }
};
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };


  return (
    <ListContainer>
      <h2>{listName}</h2>
      <h4>{t('createdBy')} {owner}</h4>
      <Button onClick={handleOpenModal}>{t('openDetails')}</Button>
      <Button onClick={handleChangeListName}>{t('changeListName')}</Button>
      <ButtonDel onClick={handleDeleteList}>{t('deleteList')}</ButtonDel>
      <ListModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        listName={listName}
        owner={owner}
        darkMode={darkMode}
        listId={listId}
        onUpdateListName={onUpdateListName}
        onDeleteList={onDeleteList}
        selectedName={selectedName}
        t={t}
      />
    </ListContainer>
  );
};


export default List;

  const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    border: 1px solid #3498db;
    padding: 1rem;
    margin: 0.5rem;
    width: 200px;
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

const ButtonDel = styled.button`
border-radius: 5px;
background-color: #e06666;
color: #fff;
padding: 0.5rem;
margin-top: 0.5rem;
cursor: pointer;
border: none;
transition: background-color 0.3s ease;

&:hover {
  background-color: #ae4e4e;
}
`;