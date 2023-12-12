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
      <TextPr>{t('selectProfile')}</TextPr>
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
  position: absolute;
  top: 15px;
  left: 10px;
`;

const TextPr = styled.label`
  color: #ffffff;
`;

const Button = styled.button`
  border-radius: 5px;
  background-color: #2980b9;
  color: #fff;
  padding: 0.5rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
  margin-left: 10px;

  &:hover {
    background-color: #1a5276;
  }
`;

const Select = styled.select`
  margin-left: 10px;
`