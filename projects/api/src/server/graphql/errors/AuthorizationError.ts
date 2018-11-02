import { ApolloError } from 'apollo-server-express';

export default class AuthorizationError extends ApolloError {
  public constructor(message: string = 'unauthorized') {
    super(message, 'AUTHORIZATION');

    Object.defineProperty(this, 'name', { value: 'AuthorizationError' });
  }
}
