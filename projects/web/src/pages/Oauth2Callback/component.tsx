import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { setToken } from '../../auth';

export type Oauth2CallbackProps = RouteComponentProps<
  Readonly<{
    provider: string;
  }>
>;

class Oauth2Callback extends React.Component<Oauth2CallbackProps> {
  public async componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const authToken = searchParams.get('authToken')!;

    await setToken(authToken);

    hardRedirectToHome();
  }

  public render() {
    return <>golaa</>;
  }
}

function hardRedirectToHome(): void {
  window.location.href = '/';
}

export default Oauth2Callback;
