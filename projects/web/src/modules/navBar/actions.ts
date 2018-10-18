import { makeAction } from '../../helpers';
import actionTypes from './actionTypes';
import { NavBarState } from './reducers';

export const setState = (state: NavBarState) =>
  makeAction(actionTypes.SET_STATE, { state });

export type SetStateAction = ReturnType<typeof setState>;

export type NavBarActions = SetStateAction;
