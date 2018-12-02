import { JSONSchema6 } from 'json-schema';

export const paginationArgsKeys = {
  first: 'first',
  after: 'after',
  last: 'last',
  before: 'before',
};

export const paginationArgsJSONSchema: Record<string, JSONSchema6> = {
  [paginationArgsKeys.first]: {
    type: ['number', 'null'],
    minimum: 0,
    maximum: 1000,
  },
  [paginationArgsKeys.after]: {
    type: ['string', 'null'],
    minLength: 2,
    maxLength: 256,
  },
  [paginationArgsKeys.last]: {
    type: ['number', 'null'],
    minimum: 0,
    maximum: 1000,
  },
  [paginationArgsKeys.before]: {
    type: ['string', 'null'],
    minLength: 2,
    maxLength: 256,
  },
};
