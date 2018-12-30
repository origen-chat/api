import { createGlobalStyle } from 'styled-components';

import borders from './borders';
import colors from './colors';
import fonts from './fonts';
import shadows from './shadows';
import spaces from './spaces';
import { fadeTransition } from './transitions';

export const GlobalStyle = createGlobalStyle`
  :root {
    ${fonts}
    ${spaces}
    ${colors}
    ${borders}
    ${shadows}

    --xs-transition: 0.05s;
    --sm-transition: 0.1s;
    --md-transition: 0.2s;
    --lg-transition: 0.3s;
    --xl-transition: 0.5s;

    --opacity-10: 0.1;
    --opacity-40: 0.4;
    --opacity-50: 0.5;
    --opacity-60: 0.6;
    --opacity-90: 0.9;

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
