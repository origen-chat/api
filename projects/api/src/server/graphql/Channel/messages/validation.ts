import { JSONSchema6 } from 'json-schema';

import { paginationArgsJSONSchema, validateArgs } from '../../validation';

const schema: JSONSchema6 = {
  type: 'object',
  required: [],
  properties: {
    ...paginationArgsJSONSchema,
  },
};

export function validateMessagesArgs(args: unknown): void {
  validateArgs(args, schema);
}
