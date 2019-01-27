import { createUser } from '../creation';

describe('createUser', () => {
  test('creates a user when the attributes are valid', async () => {
    const username = `test-username-${Math.random()}`;
    const usernameIdentifier = '1000';
    const email = `test-${Math.random()}@origen.chat`;

    const user = await createUser({ username, usernameIdentifier, email });

    expect(user.id).not.toBeNull();
    expect(user.email).toBe(email);
  });
});
