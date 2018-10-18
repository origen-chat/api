import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';

import {
  navBarActions,
  navBarSelectors,
  NavBarState,
  ReduxState,
} from '../../../modules';
import theme from '../../../theme';
import Backdrop from './Backdrop';
import ChannelsBar from './ChannelsBar';
import WorkspacesBar from './WorkspacesBar';

type GetNavBarXPositionArgs = Readonly<{
  navBarState: WrapperProps['navBarState'];
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

type WrapperProps = Pick<NavBarProps, 'navBarState'>;

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

export type NavBarProps = StateProps & DispatchProps & OwnProps;

type OwnProps = Readonly<{}>;

export class NavBar extends React.PureComponent<NavBarProps> {
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

const mapStateToProps = (state: ReduxState) => ({
  navBarState: navBarSelectors.getNavBarState(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNavBarState: (state: NavBarState) =>
    dispatch(navBarActions.setState(state)),
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export const EnhancedNavBar = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  ReduxState
>(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);

export default EnhancedNavBar;
