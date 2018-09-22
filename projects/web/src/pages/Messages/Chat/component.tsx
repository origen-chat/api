import React from 'react';
import styled from 'styled-components';

import { StoreConsumer } from '../../../components';
import { NavBarState, StoreContextValue } from '../../../store';
import TopBar from './TopBar';

export type BaseChatProps = Readonly<{
  navBarState: NavBarState;
}>;

type WrapperProps = Pick<BaseChatProps, 'navBarState'>;

type GetWrapperLeftMarginArgs = Readonly<{
  navBarState: NavBarState;
  allowXPosition0: boolean;
}>;

function getWrapperXPosition({
  navBarState,
  allowXPosition0,
}: GetWrapperLeftMarginArgs): string {
  if (navBarState === 'closed' && allowXPosition0) {
    return '0';
  }

  if (navBarState === 'halfOpen') {
    return 'var(--channels-bar-width)';
  }

  return 'var(--nav-bar-width)';
}

const Wrapper = styled.section<WrapperProps>`
  --x-position: 0;

  transform: translateX(var(--x-position));

  transition: var(--lg-transition);

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    --x-position: ${props =>
      getWrapperXPosition({
        navBarState: props.navBarState,
        allowXPosition0: false,
      })};

    width: calc(100% - var(--x-position));
  }
`;

export const BaseChat: React.SFC<BaseChatProps> = props => (
  <Wrapper navBarState={props.navBarState}>
    <TopBar />
  </Wrapper>
);

export const Chat: React.SFC = () => (
  <StoreConsumer>
    {store => {
      const baseChatProps = makeBaseChatProps(store);

      return <BaseChat {...baseChatProps} />;
    }}
  </StoreConsumer>
);

function makeBaseChatProps(store: StoreContextValue): BaseChatProps {
  const baseChatProps = { navBarState: store.state.navBarState };
  return baseChatProps;
}

export default Chat;
