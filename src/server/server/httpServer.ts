import http from 'http';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { passport } from '../authentication';
import { router } from '../router';

import graphqlServer from './graphqlServer';

const expressApp = express();

expressApp
  .use(cors())
  .use(bodyParser.json())
  .use(passport.initialize())
  .use(router);

graphqlServer.applyMiddleware({ app: expressApp });

export const httpServer = http.createServer(expressApp);

graphqlServer.installSubscriptionHandlers(httpServer);

export default httpServer;
