import { Storage } from '@google-cloud/storage';

import * as config from '../../config';

export const storage = new Storage({
  projectId: config.env.gcpProjectId,
  keyFilename: config.env.gcpPrivateKeyPath,
});
