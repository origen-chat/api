import { css } from 'styled-components';

import breakpoints from './breakpoints';

export const spaces = css`
  --xxs-space: 0.2rem;
  --xs-space: 0.3rem;
  --sm-space: 0.6rem;
  --md-space: 1rem;
  --lg-space: 1.3rem;
  --xl-space: 1.6rem;
  --xxl-space: 2rem;

  @media (min-width: ${breakpoints.lg}) {
    --lg-space: 2rem;
    --xl-space: 3rem;
    --xxl-space: 5rem;
  }
`;

export default spaces;
