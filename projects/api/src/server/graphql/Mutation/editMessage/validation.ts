import { JSONSchema6 } from 'json-schema';

import { validateArgs } from '../../validation';

const keys = {
  input: 'input',
};

const inputKeys = {
  messageId: 'messageId',
  content: 'content',
};

const schema: JSONSchema6 = {
  type: 'object',
  required: [keys.input],
  properties: {
    [keys.input]: {
      type: 'object',
      required: [inputKeys.messageId],
      properties: {
        [inputKeys.messageId]: {
          type: 'number',
        },
        [inputKeys.content]: {
          type: 'object',
        },
      },
    },
  },
};

export function validateEditMessageArgs(args: unknown): void {
  validateArgs(args, schema);
}
