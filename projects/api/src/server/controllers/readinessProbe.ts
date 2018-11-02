import http from 'http';

import { Handler } from 'express';

import * as core from '../../core';

export const readinessProbeController: Handler = (req, res) => {
  let statusCode: 200 | 503;

  if (core.core.isCoreReady()) {
    statusCode = 200;
  } else {
    statusCode = 503;
  }

  res.status(statusCode).end(http.STATUS_CODES[statusCode]);
};
