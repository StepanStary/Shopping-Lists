// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => (props.darkMode ? '#333' : '#fff')};
    color: ${props => (props.darkMode ? '#fff' : '#333')};
    /* Další globální styly podle vašich potřeb */
  }
  .Modal {
    background-color: ${props => (props.darkMode ? '#333' : '#fff')};
    color: ${props => (props.darkMode ? '#fff' : '#333')};
  }
`;

export default GlobalStyles;
