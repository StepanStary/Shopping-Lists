import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header';
import NameSelector from './components/profil';
import SeznamListu from './components/SeznamListu';
import DarkModeToggle from './components/darkmode';
import GlobalStyles from './GlobalStyles';
import './App.css';
import Modal from 'react-modal';
import LanguageSelector from './components/languageselector';
import List from './components/prehled'
import styled from 'styled-components';

Modal.setAppElement('#root');

const App = () => {
  const [selectedName, setSelectedName] = useState('VyberProfil');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSelectName = (name) => {
    setSelectedName(name);
  };

  return (
    <Router>
      <div>
        <GlobalStyles darkMode={darkMode} />
        <Header selectedName={selectedName} />
        <Switch>
          <Route path="/" exact>
          <HomeContainer>
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <NameSelector onSelectName={handleSelectName} />
            <LanguageSelector />
            </HomeContainer>
          </Route>
          <Route path="/seznamy">
            <SeznamListu selectedName={selectedName} darkMode={darkMode} />
          </Route>
          <Route path="/prehled">
            <List selectedName={selectedName} darkMode={darkMode} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;