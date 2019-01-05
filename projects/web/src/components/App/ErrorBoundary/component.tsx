import { Component } from 'react';

import { captureException } from '../../../errorTracking';

export type ErrorBoundaryProps = Readonly<{}>;

export type ErrorBoundaryState = Readonly<{
  error: Error | null;
}>;

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = { error: null };

  public componentDidCatch(error: Error) {
    this.setState({ error });

    captureException(error);
  }

  public render() {
    if (this.state.error) {
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
