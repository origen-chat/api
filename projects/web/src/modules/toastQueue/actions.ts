import { makeAction } from '../../helpers';
import actionTypes from './actionTypes';

export type EnqueueToastPayload = ToastProps &
  Readonly<{ durationInMs: number }>;

export type ToastProps = Readonly<{
  id: string;
}>;

export const enqueueToast = (payload: EnqueueToastPayload) =>
  makeAction(actionTypes.ENQUEUE_TOAST, payload);

export type EnqueueToastAction = ReturnType<typeof enqueueToast>;

export type RemoveToastPayload = Readonly<{
  id: string;
}>;

export const removeToast = (payload: RemoveToastPayload) =>
  makeAction(actionTypes.REMOVE_TOAST, payload);

export type RemoveToastAction = ReturnType<typeof removeToast>;

export type UpdateToastPayload = Pick<EnqueueToastPayload, 'id'>;

export const updateToast = (payload: UpdateToastPayload) =>
  makeAction(actionTypes.UPDATE_TOAST, payload);

export type UpdateToastAction = ReturnType<typeof updateToast>;
