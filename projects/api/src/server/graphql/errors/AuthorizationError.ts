import { ApolloError } from 'apollo-server-express';

export default class AuthorizationError extends ApolloError {
  public constructor(message: string) {
    super(message, 'AUTHORIZATION');

    Object.defineProperty(this, 'name', { value: 'AuthorizationError' });
  }
}
