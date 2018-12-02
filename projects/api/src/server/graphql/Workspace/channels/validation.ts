import { JSONSchema6 } from 'json-schema';

import {
  paginationArgsJSONSchema,
  paginationArgsKeys,
  validateArgs,
} from '../../validation';

const keys = {
  type: 'type',
  ...paginationArgsKeys,
};

const schema: JSONSchema6 = {
  type: 'object',
  required: [],
  properties: {
    [keys.type]: {
      type: ['string', 'null'],
    },
    ...paginationArgsJSONSchema,
  },
};

export function validateChannelsArgs(args: unknown): void {
  validateArgs(args, schema);
}
