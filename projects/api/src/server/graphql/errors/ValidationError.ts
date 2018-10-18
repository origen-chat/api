import { ApolloError } from 'apollo-server-express';

export default class ValidationError extends ApolloError {
  public constructor(message: string) {
    super(message, 'VALIDATION');

    Object.defineProperty(this, 'name', { value: 'ValidationError' });
  }
}
