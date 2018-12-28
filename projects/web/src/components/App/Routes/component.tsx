import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Messages, Oauth2Callback, SignIn } from '../../../pages';

export const Routes: React.FunctionComponent = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/signin" component={SignIn} />
    <Route path="/auth/callback" component={Oauth2Callback} />
    <Route path="/:workspaceId/messages/:channelId" component={Messages} />
  </Switch>
);

export default Routes;
