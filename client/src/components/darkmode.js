// DarkModeToggle.js
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';


const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  const { t } = useTranslation();
  return (
    <Button onClick={toggleDarkMode}>
      {t('toggleText', { mode: darkMode ? 'Dark' : 'Light' })}
    </Button>
  );
};

export default DarkModeToggle;

  const Button = styled.button`
    position: fixed;
    top: 15px;
    right: 10px;
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
`