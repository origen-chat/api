import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: hsla(0, 0%, 0%, 0.5);

  transition: var(--lg-transition);

  z-index: var(--nav-bar-z-index);
`;

export type BackdropProps = Readonly<{
  visible?: boolean;
  onPointerDown: React.PointerEventHandler;
}>;

export const Backdrop: React.FunctionComponent<BackdropProps> = props => {
  const ref = useRef(null);

  const handleClick: React.PointerEventHandler = event => {
    if (event.target !== ref.current) {
      return;
    }

    props.onPointerDown(event);
  };

  return (
    <CSSTransition
      in={props.visible}
      classNames="fade"
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      {() => <Wrapper onClick={handleClick} ref={ref} />}
    </CSSTransition>
  );
};

export default Backdrop;
