import { ApolloError } from 'apollo-server-express';

// eslint-disable-next-line fp/no-class
export default class ValidationError extends ApolloError {
  public constructor(message: string) {
    super(message, 'VALIDATION');

    // eslint-disable-next-line fp/no-mutating-methods, fp/no-this
    Object.defineProperty(this, 'name', { value: 'ValidationError' });
  }
}
