import { createUser } from '../creation';
import { getUserById } from '../get';

describe('createUser', () => {
  test('creates a user when the attributes are valid', async () => {
    const username = `test-username-${Math.random()}`;
    const usernameIdentifier = '1000';
    const email = `test-${Math.random()}@origen.chat`;

    const createdUser = await createUser({
      username,
      usernameIdentifier,
      email,
    });

    const user = await getUserById(createdUser.id);

    expect(user).not.toBeNull();
  });

  test("doesn't create a user with the same unique username", async () => {
    const username1 = `test-username-${Math.random()}`;
    const usernameIdentifier1 = '1000';
    const email1 = `test-${Math.random()}@origen.chat`;

    await createUser({
      username: username1,
      usernameIdentifier: usernameIdentifier1,
      email: email1,
    });

    const email2 = `test-${Math.random()}@origen.chat`;

    expect(
      createUser({
        username: username1,
        usernameIdentifier: usernameIdentifier1,
        email: email2,
      }),
    ).rejects.toThrow();
  });
});
