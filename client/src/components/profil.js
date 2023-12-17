//profil.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const NameSelector = ({ onSelectName }) => {
  const [selectedName, setSelectedName] = useState('VyberProfil');
  const { t } = useTranslation();

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };

  const handleSelectName = () => {
    if (selectedName.trim() !== '' && selectedName !== 'VyberProfil') {
      onSelectName(selectedName);
    } else {
      alert('Vyberte platný profil')
      console.log('Vyberte platný profil');
    }
  };

  return (
    <Profil className='profile'>
      <p>{t('selectProfile')}</p>
      <Select value={selectedName} onChange={handleNameChange}>
        <option value="VyberProfil" disabled>{t('selectProfile')}</option>
        <option value="Honza">Honza</option>
        <option value="Kuba">Kuba</option>
        <option value="Barbora">Barbora</option>
      </Select>
      <Button onClick={handleSelectName}>{t('select')}</Button>
    </Profil>
  );
};

export default NameSelector;

const Profil = styled.div`
`;


const Button = styled.button`
  border-radius: 5px;
  background-color: #2980b9;
  color: #fff;
  padding: 0.5rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
  margin-left: 15px;

  &:hover {
    background-color: #1a5276;
  }
`;

const Select = styled.select`
  padding: 1rem;
  border-radius: 10px;
`