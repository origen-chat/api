import Ajv, { ErrorObject } from 'ajv';

import { JSONSchema6 } from 'json-schema';
import { UserInputError } from '../errors';

export function validateArgs(args: unknown, schema: JSONSchema6): void {
  const ajv = new Ajv({ allErrors: true });

  const valid = ajv.validate(schema, args);

  if (!valid && ajv.errors) {
    const invalidArgs = formatErrors(ajv.errors);

    throw new UserInputError({ invalidArgs });
  }
}

function formatErrors(errors: ReadonlyArray<ErrorObject>): any {
  return errors;
}
