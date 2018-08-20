import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../../../pages/Home';
import Messages from '../../../pages/Messages';

export const Routes: React.SFC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/:workspace/messages/:channel" component={Messages} />
  </Switch>
);

export default Routes;
