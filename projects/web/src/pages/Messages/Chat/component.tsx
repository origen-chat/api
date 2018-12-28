import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { navBarSelectors, ReduxState } from '../../../modules';
import TopBar from './TopBar';

type WrapperProps = Pick<ChatProps, 'navBarState'>;

type GetWrapperLeftMarginArgs = Readonly<{
  navBarState: WrapperProps['navBarState'];
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

export type ChatProps = StateProps & OwnProps;

export type OwnProps = Readonly<{}>;

export const Chat: React.FunctionComponent<ChatProps> = props => (
  <Wrapper navBarState={props.navBarState}>
    <TopBar />
  </Wrapper>
);

export type StateProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: ReduxState) => ({
  navBarState: navBarSelectors.getNavBarState(state),
});

export const EnhancedChat = connect<StateProps, {}, OwnProps, ReduxState>(
  mapStateToProps,
)(Chat);

export default EnhancedChat;
