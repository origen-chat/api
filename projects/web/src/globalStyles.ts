import { injectGlobal } from 'styled-components';

/* eslint-disable-next-line no-unused-expressions */
injectGlobal`
  :root {
    --primary-color: hsla(10, 85%, 61%, 1);
    --secondary-color: hsla(245, 91%, 74%, 1);

    --grey: hsla(18, 22%, 91%, 1);
    --dark-grey: hsla(60, 1%, 85%, 1);

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
