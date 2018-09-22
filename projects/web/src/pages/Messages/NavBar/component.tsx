import React from 'react';
import styled from 'styled-components';

import { StoreConsumer } from '../../../components';
import { NavBarState } from '../../../store';
import ChannelsBar from './ChannelsBar';
import WorkspacesBar from './WorkspacesBar';

type GetNavBarXPositionArgs = Readonly<{
  navBarState: NavBarState;
  allowClosed?: boolean;
}>;

function getNavBarXPosition({
  navBarState,
  allowClosed = true,
}: GetNavBarXPositionArgs): string {
  if (allowClosed && navBarState === 'closed') {
    return 'calc(-1 * var(--nav-bar-width))';
  }

  if (navBarState === 'halfOpen') {
    return 'calc(-1 * var(--workspaces-bar-width))';
  }

  return '0';
}

type WrapperProps = Pick<BaseNavBarProps, 'navBarState'>;

const Wrapper = styled.nav<WrapperProps>`
  --x-position: ${props =>
    getNavBarXPosition({ navBarState: props.navBarState })};

  display: flex;
  flex-flow: row nowrap;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: var(--nav-bar-z-index);

  transform: translateX(var(--x-position));
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);

  transition: var(--lg-transition);

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    --x-position: ${props =>
      getNavBarXPosition({
        navBarState: props.navBarState,
        allowClosed: false,
      })};
  }
`;

export type BaseNavBarProps = Readonly<{
  navBarState: NavBarState;
}>;

export const BaseNavBar: React.SFC<BaseNavBarProps> = props => (
  <Wrapper navBarState={props.navBarState}>
    <WorkspacesBar />
    <ChannelsBar />
  </Wrapper>
);

const NavBar: React.SFC = () => (
  <StoreConsumer>
    {store => <BaseNavBar navBarState={store.state.navBarState} />}
  </StoreConsumer>
);

export default NavBar;
