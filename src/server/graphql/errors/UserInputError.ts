import { ApolloError } from 'apollo-server-express';

const errorCode = 'USER_INPUT_ERROR';

// eslint-disable-next-line fp/no-class
export default class UserInputError extends ApolloError {
  public constructor(info: any) {
    super(errorCode, errorCode, info);

    // eslint-disable-next-line fp/no-mutating-methods, fp/no-this
    Object.defineProperty(this, 'name', { value: 'UserInputError' });
  }
}
