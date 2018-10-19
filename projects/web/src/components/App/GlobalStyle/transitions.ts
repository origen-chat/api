import { css } from 'styled-components';

export const fadeTransition = css`
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
  }
`;
