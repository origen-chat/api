import { AuthenticationError as ApolloAuthenticationError } from 'apollo-server-express';

// eslint-disable-next-line fp/no-class
export default class AuthenticationError extends ApolloAuthenticationError {
  public constructor(message: string = 'unauthenticated') {
    super(message);
  }
}
