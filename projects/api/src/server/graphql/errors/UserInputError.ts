import { ApolloError } from 'apollo-server-express';

const errorCode = 'USER_INPUT_ERROR';

export default class UserInputError extends ApolloError {
  public constructor(info: any) {
    super(errorCode, errorCode, info);

    Object.defineProperty(this, 'name', { value: 'UserInputError' });
  }
}
