//app.js
import React, { useState } from 'react';
import Header from './components/header';
import NameSelector from './components/profil';
import SeznamListu from './components/SeznamListu';
import DarkModeToggle from './components/darkmode';
import GlobalStyles from './GlobalStyles';
import './App.css';
import Modal from 'react-modal';
import LanguageSelector from './components/languageselector';

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
    <div>
      <GlobalStyles darkMode={darkMode} />
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <NameSelector onSelectName={handleSelectName} />
      <Header selectedName={selectedName} />
      <LanguageSelector />
      <SeznamListu selectedName={selectedName} darkMode={darkMode} />
    </div>
  );
};

export default App;
