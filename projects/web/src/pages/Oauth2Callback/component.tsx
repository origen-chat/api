import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import api from '../../api';
import { setToken } from '../../auth';

export type Oauth2CallbackProps = RouteComponentProps<
  Readonly<{
    provider: string;
  }>
>;

class Oauth2Callback extends React.Component<Oauth2CallbackProps> {
  public async componentDidMount() {
    const provider = this.props.match.params.provider;
    const searchParams = new URLSearchParams(this.props.location.search);
    const code = searchParams.get('code')!;

    const authToken = await api.auth.getAuthToken(provider, code);
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
