import { css } from 'styled-components';

export const barButtonStyle = css`
  --side-length: calc(var(--workspaces-bar-width) * 0.75);
  --vertical-margin: var(--xxs-space);

  width: var(--side-length);
  height: var(--side-length);

  margin: var(--vertical-margin) 0;

  border-radius: var(--xl-border-radius);

  transition: var(--md-transition);
  background-color: white;

  &:hover {
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75);
  }

  &:first-child {
    margin-top: calc(var(--vertical-margin) * 2);
  }

  &:last-child {
    margin-bottom: calc(var(--vertical-margin) * 2);
  }
`;
