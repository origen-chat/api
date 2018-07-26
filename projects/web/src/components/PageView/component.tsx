import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';

import { sendPageView } from '../../analytics';

export type PageViewProps = Readonly<{
  pathname: string;
}>;

export class PageViewBase extends PureComponent<PageViewProps> {
  public componentDidMount() {
    sendPageView({ path: this.props.pathname });
  }

  public componentDidUpdate(prevProps: PageViewProps) {
    const { pathname: prevPathname } = prevProps;

    if (prevPathname !== this.props.pathname) {
      sendPageView({ path: this.props.pathname });
    }
  }

  public render() {
    return null;
  }
}

const PageView = () => (
  <Route
    render={({ location }) => <PageViewBase pathname={location.pathname} />}
  />
);

export default PageView;
