import { ReduxState } from '../rootReducer';
import { ModalPropsStack } from './reducers';

export function getModalPropsStack(state: ReduxState): ModalPropsStack {
  const { modalPropsStack } = state.modalStack;

  return modalPropsStack;
}
