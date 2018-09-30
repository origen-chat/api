import { State } from '../rootReducer';
import { ModalStack } from './reducers';

export function getModalStack(state: State): ModalStack {
  const { modalStack } = state.modalStack;

  return modalStack;
}
