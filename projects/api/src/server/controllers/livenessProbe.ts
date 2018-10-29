import { Handler } from 'express';

export const livenessProbeController: Handler = (req, res) => {
  res.status(200).end('OK');
};
