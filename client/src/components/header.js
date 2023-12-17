// Header.js
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = ({ selectedName }) => {
  const { t } = useTranslation();
  const welcomeText =
    selectedName === 'VyberProfil' ? t('SelectProfile') : `${t('welcome')} ${selectedName}`;

  return (
    <HeaderContainer>
      <h1>{t('appname')}</h1>
      <h2>{welcomeText}</h2>
      {/* Přidáme odkazy na nové routy */}
      <nav>
        <NavLink to="/">Domov</NavLink>
        <NavLink to="/seznamy">Seznamy</NavLink>
        <NavLink to="/prehled">List</NavLink>
      </nav>
    </HeaderContainer>
  );
};

export default Header;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 10px;
  padding: 5px;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s ease;

  &:hover {
    border-bottom: 2px solid #fff; // Barva podtržení při najetí myší
  }

  &.active {
    border-bottom: 2px solid #fff; // Barva podtržení pro aktivní odkaz
  }
`;

const HeaderContainer = styled.div`
  position: static;
  background-color: ${({ darkMode }) => (darkMode ? '#111' : '#333')}; // Barva se mění podle stavu darkMode
  color: white;
  padding: 10px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 16px;
  }

  @media (min-width: 601px) and (max-width: 1024px) {
    font-size: 18px;
  }

  @media (min-width: 1025px) {
    font-size: 20px;
  }
`;
