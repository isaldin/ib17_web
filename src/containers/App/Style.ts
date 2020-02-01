import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Play', sans-serif;
  }

  div#root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  div#player-root {
    position: fixed;
    bottom: 0;
    right: 0;
    min-width: 300px;
    margin: 5px;
  }
`;

export { GlobalStyle };
