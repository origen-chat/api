import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';

export type BaseScrollToTopProps = Readonly<{
  pathname: string;
}>;

export class BaseScrollToTop extends PureComponent<BaseScrollToTopProps> {
  public componentDidUpdate({ pathname: prevPathname }: BaseScrollToTopProps) {
    if (prevPathname !== this.props.pathname) {
      this.scrollToTop();
    }
  }

  private scrollToTop = (): void => window.scrollTo(0, 0);

  public render() {
    return null;
  }
}

const ScrollToTop: React.FunctionComponent = () => (
  <Route
    render={({ location }) => <BaseScrollToTop pathname={location.pathname} />}
  />
);

export default ScrollToTop;
