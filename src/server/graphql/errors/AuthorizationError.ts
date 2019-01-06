import { ApolloError } from 'apollo-server-express';

// eslint-disable-next-line fp/no-class
export default class AuthorizationError extends ApolloError {
  public constructor(message: string = 'unauthorized') {
    super(message, 'AUTHORIZATION');

    // eslint-disable-next-line fp/no-mutating-methods, fp/no-this
    Object.defineProperty(this, 'name', { value: 'AuthorizationError' });
  }
}
