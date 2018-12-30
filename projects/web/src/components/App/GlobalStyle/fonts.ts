import { css } from 'styled-components';

import breakpoints from './breakpoints';

export const fonts = css`
  --sans-serif-font-family: sans-serif;
  --display-font-family: var(--sans-serif-font-family);

  --xs-font-size: 0.7rem;
  --sm-font-size: 0.8rem;
  --md-font-size: 1rem;
  --lg-font-size: 1.2rem;
  --xl-font-size: 1.5rem;
  --xxl-font-size: 1.8rem;
  --xxxl-font-size: 2rem;

  --normal-font-weight: 400;
  --bold-font-weight: 700;

  --xs-line-height: 1;
  --sm-line-height: 1.2;
  --md-line-height: 1.5;
  --lg-line-height: 1.8;
  --xl-line-height: 2;

  @media (min-width: ${breakpoints.lg}) {
    --lg-font-size: 1.5rem;
    --xl-font-size: 2rem;
    --xxl-font-size: 2.5rem;
    --xxxl-font-size: 3rem;
  }
`;

export default fonts;
