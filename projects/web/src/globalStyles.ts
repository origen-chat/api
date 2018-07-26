import { injectGlobal } from 'styled-components';

/* eslint-disable-next-line no-unused-expressions */
injectGlobal`
  :root {
  }

  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  html {
    background-color: var(--background-color);
  }

  body {
    margin: 0;
    font-family: var(--serif-font-family);
    font-size: var(--md-font-size);
    color: var(--primary-font-color);
    line-height: 1.15;
  }

  #root {
    display: flex;
    flex-flow: column nowrap;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 1em;
    line-height: 1.15;
    margin: 0;
  }
`;
