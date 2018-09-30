import { delay } from 'redux-saga';
import {
  all,
  call,
  fork,
  put,
  race,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

import * as toastQueueActions from './actions';
import toastQueueActionTypes from './actionTypes';
import * as toastQueueSelectors from './selectors';

export function* enqueueToastSaga() {
  const action = yield take([
    toastQueueActionTypes.ENQUEUE_TOAST,
    toastQueueActionTypes.REMOVE_TOAST,
    toastQueueActionTypes.UPDATE_TOAST,
  ]);

  const toastId = action.payload.id;

  const toastQueue = yield select(toastQueueSelectors.getToastQueue);

  if (toastQueue[0].id === toastId) {
    const { duration, removal } = yield race({
      duration: call(delay, action.durationInMs),
      removal: take(toastQueueActionTypes.REMOVE_TOAST),
    });

    if (removal && removal.payload.id === toastId) {
      return;
    }

    if (duration) {
      yield put(toastQueueActions.removeToast({ id: toastId }));
    }
  }
}

export default function* toastQueueSaga() {
  const sagas = [enqueueToastSaga];
  const forkedSagas = sagas.map(fork);

  yield all(forkedSagas);
}
