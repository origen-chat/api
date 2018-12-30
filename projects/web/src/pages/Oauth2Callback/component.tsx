import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { setToken } from '../../auth';

export type Oauth2CallbackProps = RouteComponentProps<
  Readonly<{
    provider: string;
  }>
>;

export const Oauth2Callback: React.FunctionComponent<
  Oauth2CallbackProps
> = props => {
  useEffect(() => {
    const searchParams = new URLSearchParams(props.location.search);
    const authToken = searchParams.get('authToken')!;

    setToken(authToken).then(hardRedirectToHome);
  });

  return null;
};

function hardRedirectToHome(): void {
  window.location.href = '/';
}

export default Oauth2Callback;
