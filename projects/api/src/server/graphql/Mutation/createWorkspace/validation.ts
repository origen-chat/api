import { JSONSchema6 } from 'json-schema';

import { validateArgs } from '../../validation';

const keys = {
  input: 'input',
};

const inputKeys = {
  name: 'name',
  displayName: 'displayName',
  description: 'description',
};

const schema: JSONSchema6 = {
  type: 'object',
  required: [keys.input],
  properties: {
    [keys.input]: {
      type: 'object',
      required: [inputKeys.name, inputKeys.displayName],
      properties: {
        [inputKeys.name]: {
          type: 'string',
          minLength: 2,
          maxLength: 64,
        },
        [inputKeys.displayName]: {
          type: 'string',
          minLength: 2,
          maxLength: 64,
        },
        [inputKeys.description]: {
          type: ['string', 'null'],
          minLength: 2,
          maxLength: 256,
        },
      },
    },
  },
};

export function validateCreateWorkspaceArgs(args: unknown): void {
  validateArgs(args, schema);
}
