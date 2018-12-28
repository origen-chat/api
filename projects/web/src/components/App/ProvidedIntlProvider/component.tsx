import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { IntlProvider } from 'react-intl';

import { SomethingWentWrongError } from '../../../errors';

export type BaseProvidedIntlProviderProps = Readonly<
  | { loading: true }
  | {
      loading: false;
      locale: string;
      messages: any;
    }
>;

export const BaseProvidedIntlProvider: React.FunctionComponent<
  BaseProvidedIntlProviderProps
> = props => {
  if (props.loading) {
    return null;
  }

  return (
    <IntlProvider locale={props.locale} messages={props.messages}>
      {React.Children.only(props.children)}
    </IntlProvider>
  );
};

const viewerLocaleQuery = gql`
  query ViewerLocaleQuery {
    viewer {
      settings {
        locale
      }
    }
  }
`;

class ViewerLocaleQuery extends Query {}

export const ProvidedIntlProvider: React.FunctionComponent = props => (
  <ViewerLocaleQuery query={viewerLocaleQuery}>
    {result => {
      const baseProvidedIntlProviderProps = makeBaseProvidedIntlProviderProps(
        result,
      );

      return (
        <BaseProvidedIntlProvider {...baseProvidedIntlProviderProps}>
          {props.children}
        </BaseProvidedIntlProvider>
      );
    }}
  </ViewerLocaleQuery>
);

function makeBaseProvidedIntlProviderProps(
  result: QueryResult,
): BaseProvidedIntlProviderProps {
  if (result.loading) {
    return { loading: true };
  }

  if (result.error || !result.data) {
    throw new SomethingWentWrongError();
  }

  const { locale } = result.data.viewer.settings;
  const lowerCaseLocale = locale.toLowerCase();
  const messages = getMessages(lowerCaseLocale);

  return {
    loading: false,
    locale: lowerCaseLocale,
    messages,
  };
}

function getMessages(locale: string): any {
  return {};
}

export default ProvidedIntlProvider;
