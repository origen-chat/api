import { isError, isFSA } from 'flux-standard-action';

import { makeAction } from './actions';

describe('makeAction', () => {
  test('returns a Flux Standard Action when only payload is provided', () => {
    const actionType = 'testActionType';
    const payload = { test: true };
    const action = makeAction(actionType, payload);

    expect(isFSA(action)).toBe(true);
  });

  test('returns a Flux Standard Action when meta is provided', () => {
    const actionType = 'testActionType';
    const payload = { test: true };
    const meta = 'meta';
    const action = makeAction(actionType, payload, meta);

    expect(isFSA(action)).toBe(true);
  });

  test('returns a Flux Standard Action when payload is an error', () => {
    const actionType = 'testActionType';
    const payload = new Error('test');
    const action = makeAction(actionType, payload);

    expect(isError(action)).toBe(true);
  });
});
