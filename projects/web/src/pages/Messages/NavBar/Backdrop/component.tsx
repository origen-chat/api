import React from 'react';
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
  onClick: React.EventHandler<React.SyntheticEvent>;
}>;

export class Backdrop extends React.PureComponent<BackdropProps> {
  public static defaultProps = {
    visible: false,
  };

  private ref = React.createRef<HTMLElement>();

  private handleClick: React.EventHandler<React.SyntheticEvent> = event => {
    if (event.target !== this.ref.current) {
      return;
    }

    this.props.onClick(event);
  };

  public render() {
    return (
      <CSSTransition
        in={this.props.visible}
        classNames="fade"
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {() => <Wrapper onClick={this.handleClick} innerRef={this.ref} />}
      </CSSTransition>
    );
  }
}

export default Backdrop;
