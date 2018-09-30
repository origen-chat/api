import { injectGlobal } from 'styled-components';

import theme from './theme';

const transitionsString = Object.entries(theme.transitions).join(' ');

/* eslint-disable-next-line no-unused-expressions */
injectGlobal`
  :root {
    --sans-serif-font-family: sans-serif;
    --display-font-family: var(--sans-serif-font-family);

    --primary-color: hsla(10, 85%, 61%, 1);
    --secondary-color: hsla(245, 91%, 74%, 1);

    --primary-font-color: hsla(0, 0%, 10%, 1);
    --secondary-font-color: hsla(0, 0%, 30%, 1);
    --tertiary-font-color: hsla(0, 0%, 40%, 1);
    --quaternary-font-color: hsla(0, 0%, 70%, 1);

    --grey: hsla(18, 22%, 91%, 1);
    --dark-grey: hsla(60, 1%, 85%, 1);

    --xs-font-size: 0.8rem;
    --sm-font-size: 0.82rem;
    --md-font-size: 1rem;
    --lg-font-size: 1.4rem;
    --xl-font-size: 2.5rem;
    --xxl-font-size: 5rem;

    --base-space: 0.2rem;
    --xxs-space: calc(var(--base-space) * 2);
    --xs-space: calc(var(--base-space) * 3);
    --sm-space: calc(var(--base-space) * 5);
    --md-space: calc(var(--base-space) * 8);
    --lg-space: calc(var(--base-space) * 13);
    --xl-space: calc(var(--base-space) * 21);

    --sm-transition: 0.1s;
    --md-transition: 0.2s;
    --lg-transition: 0.3s;

    --xs-border-radius: 5%;
    --sm-border-radius: 10%;
    --md-border-radius: 20%;
    --lg-border-radius: 30%;
    --xl-border-radius: 50%;

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

  ${transitionsString}
`;
