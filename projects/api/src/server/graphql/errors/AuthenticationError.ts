import { AuthenticationError as ApolloAuthenticationError } from 'apollo-server-express';

export default class AuthenticationError extends ApolloAuthenticationError {
  public constructor(message: string = 'unauthenticated') {
    super(message);
  }
}
