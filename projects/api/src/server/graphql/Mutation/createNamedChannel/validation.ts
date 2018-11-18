import { JSONSchema6 } from 'json-schema';

import { validateArgs } from '../../validation';

const keys = {
  input: 'input',
};

const inputKeys = {
  name: 'name',
  privacy: 'privacy',
  workspaceId: 'workspaceId',
};

const schema: JSONSchema6 = {
  type: 'object',
  required: [keys.input],
  properties: {
    [keys.input]: {
      type: 'object',
      required: [inputKeys.name, inputKeys.privacy, inputKeys.workspaceId],
      properties: {
        [inputKeys.name]: {
          type: 'string',
          minLength: 2,
          maxLength: 64,
        },
        [inputKeys.privacy]: {
          type: 'string',
        },
        [inputKeys.workspaceId]: {
          type: 'number',
        },
      },
    },
  },
};

export function validateCreateNamedChannelArgs(args: unknown): void {
  validateArgs(args, schema);
}
