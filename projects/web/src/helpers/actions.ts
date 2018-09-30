import { ActionType } from './actionTypes';

export type Action<
  TType extends ActionType,
  TPayload = undefined,
  TMeta = undefined
> = Readonly<{
  type: TType;
  payload: TPayload;
  error: ActionError<TPayload>;
  meta: TMeta;
}>;

export type ActionError<TPayload> = TPayload extends Error ? true : false;

export function makeAction<
  TType extends ActionType,
  TPayload = undefined,
  TMeta = undefined
>(
  type: TType,
  payload?: TPayload,
  meta?: TMeta,
): Action<TType, TPayload, TMeta> {
  const error = (payload instanceof Error) as ActionError<TPayload>;

  const action: Action<TType, TPayload, TMeta> = {
    type,
    payload: payload as TPayload,
    error,
    meta: meta as TMeta,
  };

  return action;
}
