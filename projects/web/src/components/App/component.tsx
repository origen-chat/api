import { ApolloClient } from 'apollo-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Cache } from '../../apolloClient';
import { Theme } from '../../theme';
import PageView from '../PageView';
import ErrorBoundary from './ErrorBoundary';
import Routes from './Routes';
import ScrollToTop from './ScrollToTop';

export type AppProps = Readonly<{
  theme: Theme;
  apolloClient: ApolloClient<Cache>;
}>;

export const App: React.SFC<AppProps> = ({ apolloClient, theme }) => (
  <Router>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <ScrollToTop />
          <PageView />
          <Routes />
        </ErrorBoundary>
      </ThemeProvider>
    </ApolloProvider>
  </Router>
);

export default App;
