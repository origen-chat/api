import { JSONSchema6 } from 'json-schema';

import {
  paginationArgsJSONSchema,
  paginationArgsKeys,
  validateArgs,
} from '../../validation';

const keys = {
  role: 'role',
  ...paginationArgsKeys,
};

const schema: JSONSchema6 = {
  type: 'object',
  required: [],
  properties: {
    [keys.role]: {
      type: ['string', 'null'],
    },
    ...paginationArgsJSONSchema,
  },
};

export function validateWorkspacesArgs(args: unknown): void {
  validateArgs(args, schema);
}
