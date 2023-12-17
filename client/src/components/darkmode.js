// DarkModeToggle.js
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';


const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  const { t } = useTranslation();
  return (
    <Button onClick={toggleDarkMode}>
      {t('toggleText', { mode: darkMode ? t('Light') : t('Dark') })}
    </Button>
  );
};

export default DarkModeToggle;

  const Button = styled.button`
  text-align: center;
    border-radius: 5px;
    background-color: #2980b9;
    color: #fff;
    padding: 1rem;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease;
    margin: 0 auto;
    font-size: 1rem;

    &:hover {
     background-color: #1a5276;
}
`;