import { JSONSchema6 } from 'json-schema';

import { validateArgs } from '../../validation';

const keys = {
  input: 'input',
};

const inputKeys = {
  channelId: 'channelId',
  parentMessageId: 'parentMessageId',
  content: 'content',
};

const schema: JSONSchema6 = {
  type: 'object',
  required: [keys.input],
  properties: {
    [keys.input]: {
      type: 'object',
      required: [inputKeys.channelId, inputKeys.content],
      properties: {
        [inputKeys.channelId]: {
          type: 'number',
        },
        [inputKeys.parentMessageId]: {
          type: ['number', 'null'],
        },
        [inputKeys.content]: {
          type: 'object',
        },
      },
    },
  },
};

export function validateSendMessageArgs(args: unknown): void {
  validateArgs(args, schema);
}
