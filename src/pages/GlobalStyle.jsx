import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #dfa4ff;
    font-family: 'Fredericka the Great', cursive;
  }
`;

export default GlobalStyle;