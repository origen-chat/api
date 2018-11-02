import http from 'http';

import { Handler } from 'express';

export const livenessProbeController: Handler = (req, res) => {
  const statusCode = 200;

  res.status(statusCode).end(http.STATUS_CODES[statusCode]);
};
