import React from 'react';
import styled from 'styled-components';

import { StoreConsumer } from '../../../components';
import { NavBarState } from '../../../store';
import ChannelsBar from './ChannelsBar';
import WorkspacesBar from './WorkspacesBar';

function getNavBarPositionX(navBarState: NavBarState): string {
  if (navBarState === 'closed') {
    return 'calc(-1 * var(--nav-bar-width))';
  }

  if (navBarState === 'halfOpen') {
    return 'calc(-1* var(--workspaces-bar-width))';
  }

  return '0';
}

type WrapperProps = Pick<BaseNavBarProps, 'navBarState'>;

const Wrapper = styled.nav<WrapperProps>`
  --position-x: ${props => getNavBarPositionX(props.navBarState)};

  display: flex;
  flex-flow: row nowrap;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  transition: var(--lg-transition);

  transform: translateX(var(--position-x));

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    --position-x: 0;
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
