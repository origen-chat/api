import { createGlobalStyle } from 'styled-components';

import colors from './colors';
import { fadeTransition } from './transitions';

export const GlobalStyle = createGlobalStyle`
  :root {
    --sans-serif-font-family: sans-serif;
    --display-font-family: var(--sans-serif-font-family);

    --xxs-font-size: 0.7rem;
    --xs-font-size: 0.8rem;
    --sm-font-size: 0.9rem;
    --md-font-size: 1rem;
    --lg-font-size: 1.4rem;
    --xl-font-size: 2.5rem;
    --xxl-font-size: 5rem;

    --xxs-space: 0.2rem;
    --xs-space: 0.5rem;
    --sm-space: 0.8rem;
    --md-space: 1rem;
    --lg-space: 2rem;
    --xl-space: 3rem;
    --xxl-space: 5rem;

    --xs-transition: 0.05s;
    --sm-transition: 0.1s;
    --md-transition: 0.2s;
    --lg-transition: 0.3s;
    --xl-transition: 0.5s;

    --xs-border-radius: 0.1rem;
    --sm-border-radius: 0.2rem;
    --md-border-radius: 0.5rem;
    --lg-border-radius: 0.8rem;
    --xl-border-radius: 1rem;
    --xxl-border-radius: 50%;

    ${colors}

    --workspaces-bar-width: 5rem;
    --channels-bar-width: 16rem;
    --nav-bar-width: calc(var(--workspaces-bar-width) + var(--channels-bar-width));

    --top-bar-height: 4rem;

    --nav-bar-z-index: 1000;
    --modal-stack-z-index: 2000;
    --toast-queue-z-index: 3000;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: var(--sans-serif-font-family);
    font-size: var(--md-font-size);
    color: var(--secondary-font-color);
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

  ${fadeTransition}
`;

export default GlobalStyle;
