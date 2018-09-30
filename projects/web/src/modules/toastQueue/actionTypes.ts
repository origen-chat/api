import { makeActionTypes } from '../../helpers';

export const scope = 'toastQueue/';

const actionTypes = makeActionTypes(
  ['ENQUEUE_TOAST', 'REMOVE_TOAST', 'UPDATE_TOAST'],
  scope,
);

export default actionTypes;
