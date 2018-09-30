import React from 'react';
import styled from 'styled-components';

import { StoreConsumer } from '../../../components';
import { NavBarState, SetNavBarState } from '../../../store';
import theme from '../../../theme';
import Backdrop from './Backdrop';
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
  ${props =>
    props.navBarState !== 'closed' &&
    'box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75)'};

  transition: var(--lg-transition);

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    --x-position: ${props =>
      getNavBarXPosition({
        navBarState: props.navBarState,
        allowClosed: false,
      })};

    box-shadow: none;
  }
`;

export type BaseNavBarProps = Readonly<{
  navBarState: NavBarState;
  setNavBarState: SetNavBarState;
}>;

export class BaseNavBar extends React.PureComponent<BaseNavBarProps> {
  public componentDidMount() {
    this.addMediaQueryListener();
  }

  public componentWillUnmount() {
    this.removeMediaQueryListener();
  }

  private readonly minWidthBreakpointLgMediaQuery = window.matchMedia(
    `(min-width: ${theme.breakpoints.lg})`,
  );

  private minWidthBreakpointLgMediaQueryMatches = this
    .minWidthBreakpointLgMediaQuery.matches;

  private addMediaQueryListener(): void {
    this.minWidthBreakpointLgMediaQuery.addListener(
      this.handleMinWidthBreakpointLgMediaQueryChange,
    );
  }

  private removeMediaQueryListener(): void {
    this.minWidthBreakpointLgMediaQuery.removeListener(
      this.handleMinWidthBreakpointLgMediaQueryChange,
    );
  }

  private readonly handleMinWidthBreakpointLgMediaQueryChange: MediaQueryListListener = event => {
    if (event.matches) {
      this.minWidthBreakpointLgMediaQueryMatches = true;
      this.openNavBar();
    } else {
      this.minWidthBreakpointLgMediaQueryMatches = false;
      this.closeNavBar();
    }
  };

  private shouldShowBackdrop(): boolean {
    return (
      !this.minWidthBreakpointLgMediaQueryMatches &&
      this.props.navBarState !== 'closed'
    );
  }

  private openNavBar = () => this.props.setNavBarState('open');

  private closeNavBar = () => this.props.setNavBarState('closed');

  public render() {
    return (
      <>
        <Backdrop
          visible={this.shouldShowBackdrop()}
          onClick={this.closeNavBar}
        />
        <Wrapper navBarState={this.props.navBarState}>
          <WorkspacesBar />
          <ChannelsBar />
        </Wrapper>
      </>
    );
  }
}

const NavBar: React.SFC = () => (
  <StoreConsumer>
    {store => (
      <BaseNavBar
        navBarState={store.state.navBarState}
        setNavBarState={store.actions.setNavBarState}
      />
    )}
  </StoreConsumer>
);

export default NavBar;
