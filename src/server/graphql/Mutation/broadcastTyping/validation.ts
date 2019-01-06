import { JSONSchema6 } from 'json-schema';

import { validateArgs } from '../../validation';

const keys = {
  input: 'input',
};

const inputKeys = {
  channelId: 'channelId',
};

const schema: JSONSchema6 = {
  type: 'object',
  required: [keys.input],
  properties: {
    [keys.input]: {
      type: 'object',
      required: [inputKeys.channelId],
      properties: {
        [inputKeys.channelId]: {
          type: 'number',
        },
      },
    },
  },
};

export function validateSendMessageArgs(args: unknown): void {
  validateArgs(args, schema);
}
