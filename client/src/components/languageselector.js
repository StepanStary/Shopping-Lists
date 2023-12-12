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
      <TextPr htmlFor="languageSelect">{t('ChoseLanguage')}</TextPr>
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
  position: absolute;
  top: 50px;
  left: 10px;
`

const TextPr = styled.label`
  color: #ffffff;
`;

const Select = styled.select`
margin-left: 10px;

`
export default LanguageSelector;
