import { ApolloClient } from 'apollo-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Cache } from '../../apolloClient';
import { Theme } from '../../theme';
import PageView from '../PageView';
import ErrorBoundary from './ErrorBoundary';
import ModalStack from './ModalStack';
import ProvidedIntlProvider from './ProvidedIntlProvider';
import Routes from './Routes';
import ToastQueue from './ToastQueue';

export type AppProps = Readonly<{
  apolloClient: ApolloClient<Cache>;
  reduxStore: Store;
  theme: Theme;
}>;

export const App: React.SFC<AppProps> = ({
  apolloClient,
  reduxStore,
  theme,
}) => (
  <Router>
    <ApolloProvider client={apolloClient}>
      <ProvidedIntlProvider>
        <ThemeProvider theme={theme}>
          <ReduxProvider store={reduxStore}>
            <ErrorBoundary>
              <PageView />
              <Routes />
              <ModalStack />
              <ToastQueue />
            </ErrorBoundary>
          </ReduxProvider>
        </ThemeProvider>
      </ProvidedIntlProvider>
    </ApolloProvider>
  </Router>
);

export default App;
