import React, { StrictMode } from 'react';
import { hot } from 'react-hot-loader';

import theme from '../../theme';
import App from '../App';

export const Root: React.SFC = () => (
  <StrictMode>
    <App theme={theme} />
  </StrictMode>
);

export default hot(module)(Root);
