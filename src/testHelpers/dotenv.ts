import path from 'path';
import fs from 'fs';

import dotenv from 'dotenv';

const dotenvFilePath = path.resolve(
  path.dirname(path.dirname(__dirname)),
  '.env.test',
);

overrideProcessEnv();

export async function overrideProcessEnv(): Promise<void> {
  const dotenvFile = fs.readFileSync(dotenvFilePath);

  const envConfig = dotenv.parse(dotenvFile);

  Object.entries(envConfig).forEach(([key, value]) => {
    process.env[key] = value;
  });
}
