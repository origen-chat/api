export const fadeTransition = `
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

export type Transitions = Readonly<{ [transitionName: string]: string }>;

export const transitions: Transitions = {
  fadeTransition,
};

export default transitions;
