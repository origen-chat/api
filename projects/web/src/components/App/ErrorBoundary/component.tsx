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

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error });
    captureException(error, { extra: errorInfo });
  }

  public render() {
    if (this.state.error) {
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
