import { makeActionTypes } from '../../helpers';

export const scope = 'modalStack/';

const actionTypes = makeActionTypes(['PUSH_MODAL', 'POP_MODAL'], scope);

export default actionTypes;
