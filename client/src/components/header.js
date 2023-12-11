// Header.js
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Header = ({ selectedName }) => {
  const { t } = useTranslation();
  const welcomeText = selectedName === 'VyberProfil' ? t('SelectProfile') : `${t('welcome')} ${selectedName}`;

  return (
    <HeaderContainer>
      <h1>{t('appname')}</h1>
      <h2>{welcomeText}</h2>
    </HeaderContainer>
  );
};

export default Header;


const HeaderContainer = styled.div`
  position: static;
  background-color: ${({ darkMode }) => (darkMode ? '#111' : '#333')}; // Barva se mění podle stavu darkMode
  color: white;
  padding: 10px;
  text-align: center;

  @media (max-width: 600px) {
    /* Styl pro obrazovky s maximální šířkou 600px */
    font-size: 16px;
  }

  @media (min-width: 601px) and (max-width: 1024px) {
    /* Styl pro obrazovky s šířkou mezi 601px a 1024px */
    font-size: 18px;
  }

  @media (min-width: 1025px) {
    /* Styl pro obrazovky s minimální šířkou 1025px */
    font-size: 20px;
  }
`;
