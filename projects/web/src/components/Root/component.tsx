import React, { StrictMode } from 'react';
import { hot } from 'react-hot-loader';

import apolloClient from '../../apolloClient';
import theme from '../../theme';
import App from '../App';

export const Root: React.SFC = () => (
  <StrictMode>
    <App apolloClient={apolloClient} theme={theme} />
  </StrictMode>
);

export default hot(module)(Root);
