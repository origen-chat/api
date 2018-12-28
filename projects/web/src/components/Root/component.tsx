import React, { StrictMode } from 'react';
import { hot } from 'react-hot-loader';

import apolloClient from '../../apolloClient';
import { createReduxStore } from '../../store';
import theme from '../../theme';
import App from '../App';

const reduxStore = createReduxStore();

export const Root: React.FunctionComponent = () => (
  <StrictMode>
    <App apolloClient={apolloClient} reduxStore={reduxStore} theme={theme} />
  </StrictMode>
);

export default hot(module)(Root);
