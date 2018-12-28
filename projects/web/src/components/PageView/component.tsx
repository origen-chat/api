import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import { sendPageView } from '../../analytics';

export type PageViewProps = Readonly<{
  pathname: string;
}>;

export const PageViewBase: React.FunctionComponent<PageViewProps> = props => {
  useSendPageView(props.pathname);

  return null;
};

function useSendPageView(pathname: string): void {
  useEffect(
    () => {
      sendPageView({ path: pathname });
    },
    [pathname],
  );
}

const PageView = () => (
  <Route
    render={({ location }) => <PageViewBase pathname={location.pathname} />}
  />
);

export default PageView;
