import http from 'http';

import { Handler } from 'express';

import * as core from '../../core';

export const readinessProbeController: Handler = (request, response) => {
  let statusCode: 200 | 503;

  if (core.core.isCoreReady()) {
    statusCode = 200;
  } else {
    statusCode = 503;
  }

  response.status(statusCode).end(http.STATUS_CODES[statusCode]);
};
