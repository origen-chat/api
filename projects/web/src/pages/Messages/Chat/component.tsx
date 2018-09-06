import React from 'react';
import styled from 'styled-components';

import { StoreConsumer } from '../../../components';
import { NavBarState, StoreContextValue } from '../../../store';

export type BaseChatProps = Readonly<{
  navBarState: NavBarState;
}>;

type WrapperProps = Pick<BaseChatProps, 'navBarState'>;

type GetWrapperLeftMarginArgs = Readonly<{
  navBarState: NavBarState;
  allow0Margin: boolean;
}>;

function getWrapperLeftMargin({
  navBarState,
  allow0Margin,
}: GetWrapperLeftMarginArgs): string {
  if (navBarState === 'closed' && allow0Margin) {
    return '0';
  }

  if (navBarState === 'halfOpen') {
    return 'var(--channels-bar-width)';
  }

  return 'var(--nav-bar-width)';
}

const Wrapper = styled.section<WrapperProps>`
--margin-left:${props =>
  getWrapperLeftMargin({
    navBarState: props.navBarState,
    allow0Margin: true,
  })};

  margin-left: var(--margin-left);
  transition: var(--lg-transition);

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    --margin-left: ${props =>
      getWrapperLeftMargin({
        navBarState: props.navBarState,
        allow0Margin: false,
      })};
`;

export const BaseChat: React.SFC<BaseChatProps> = props => (
  <Wrapper navBarState={props.navBarState}>chat</Wrapper>
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
