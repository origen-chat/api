import { generateRandomHexString } from '../crypto';

import { invitationCodeLength } from './constants';

export async function generateRandomCode(): Promise<string> {
  const code = await generateRandomHexString(invitationCodeLength);

  return code;
}
