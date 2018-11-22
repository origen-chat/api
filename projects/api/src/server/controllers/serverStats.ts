import os from 'os';

import { Handler } from 'express';

export const serverStatsController: Handler = (request, response) => {
  const serverStats = {
    server: {
      arch: os.arch(),
      platform: os.platform(),
      release: os.release(),
      cpus: os.cpus(),
      uptime: os.uptime(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      pid: process.pid,
      nodeVersion: process.version,
      currentDateTime: new Date().toISOString(),
    },
  };

  response.status(200).json(serverStats);
};
