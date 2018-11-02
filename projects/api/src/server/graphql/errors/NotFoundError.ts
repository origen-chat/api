import { ApolloError } from 'apollo-server-express';

export type NotFoundErrorConstructorArgs =
  | string
  | Readonly<{ entity: string }>;

export default class NotFoundError extends ApolloError {
  public constructor(messageOrArgs: NotFoundErrorConstructorArgs) {
    let message;

    if (typeof messageOrArgs === 'string') {
      message = messageOrArgs;
    } else {
      message = `${messageOrArgs.entity} not found`;
    }

    super(message, 'NOT_FOUND');

    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}
