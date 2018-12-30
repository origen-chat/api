import { ApolloClient } from 'apollo-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { Cache } from '../../apolloClient';
import { ReduxStore } from '../../store';
import PageView from '../PageView';
import ErrorBoundary from './ErrorBoundary';
import GlobalStyle from './GlobalStyle';
import ModalStack from './ModalStack';
import ProvidedIntlProvider from './ProvidedIntlProvider';
import Routes from './Routes';

export type AppProps = Readonly<{
  apolloClient: ApolloClient<Cache>;
  reduxStore: ReduxStore;
}>;

export const App: React.FunctionComponent<AppProps> = ({
  apolloClient,
  reduxStore,
}) => (
  <Router>
    <ApolloProvider client={apolloClient}>
      {/* <ProvidedIntlProvider> */}
      <ReduxProvider store={reduxStore}>
        <ErrorBoundary>
          <GlobalStyle />
          <PageView />
          <Routes />
          <ModalStack />
        </ErrorBoundary>
      </ReduxProvider>
      {/* </ProvidedIntlProvider> */}
    </ApolloProvider>
  </Router>
);

export default App;
