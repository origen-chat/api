import { makeAction } from '../../helpers';
import actionTypes from './actionTypes';

export type PushModalPayload = Readonly<{ type: string; [name: string]: any }>;

export const pushModal = (payload: PushModalPayload) =>
  makeAction(actionTypes.PUSH_MODAL, payload);

export type PushModalAction = ReturnType<typeof pushModal>;

export const popModal = () => makeAction(actionTypes.POP_MODAL);

export type PopModalAction = ReturnType<typeof popModal>;

export type ModalStackActions = PushModalAction | PopModalAction;
