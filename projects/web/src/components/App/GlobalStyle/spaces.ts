import { css } from 'styled-components';

import breakpoints from './breakpoints';

export const spaces = css`
  --xxs-margin: 0.2rem;
  --xs-margin: 0.3rem;
  --sm-margin: 0.6rem;
  --md-margin: 1rem;
  --lg-margin: 1.3rem;
  --xl-margin: 1.6rem;
  --xxl-margin: 2rem;

  --xxs-padding: 0.2rem;
  --xs-padding: 0.3rem;
  --sm-padding: 0.6rem;
  --md-padding: 1rem;
  --lg-padding: 1.2rem;
  --xl-padding: 1.6rem;

  @media (min-width: ${breakpoints.lg}) {
    --lg-margin: 2rem;
    --xl-margin: 3rem;
    --xxl-margin: 5rem;
  }
`;

export default spaces;
