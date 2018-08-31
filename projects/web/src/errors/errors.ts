export class SomethingWentWrongError extends Error {
  constructor() {
    const message = 'something went wrong';

    super(message);
  }
}
