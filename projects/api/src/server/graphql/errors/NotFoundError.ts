import { ApolloError } from 'apollo-server-express';

export default class NotFoundError extends ApolloError {
  public constructor(message: string) {
    super(message, 'NOT_FOUND');

    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}
