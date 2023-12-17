import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <LanguageSelect>
      <p htmlFor="languageSelect">{t('ChoseLanguage')}</p>
      <Select
        id="languageSelect"
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
      >
        <option value="en">English</option>
        <option value="cs">Čeština</option>
        {/* Add more language options as needed */}
      </Select>
    </LanguageSelect>
  );
};

const LanguageSelect = styled.div`

`


const Select = styled.select`
  padding: 1rem;
  border-radius: 10px;
`
export default LanguageSelector;
