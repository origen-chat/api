import http from 'http';

import { Handler } from 'express';

export const livenessProbeController: Handler = (request, response) => {
  const statusCode = 200;

  response.status(statusCode).end(http.STATUS_CODES[statusCode]);
};
