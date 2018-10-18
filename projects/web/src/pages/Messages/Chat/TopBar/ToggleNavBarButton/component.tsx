import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';

import {
  navBarActions,
  navBarSelectors,
  NavBarState,
  ReduxState,
} from '../../../../../modules';

const Wrapper = styled.div`
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
`;

export type ToggleNavBarButtonProps = StateProps & DispatchProps & OwnProps;

export type OwnProps = Readonly<{}>;

export class ToggleNavBarButton extends React.Component<
  ToggleNavBarButtonProps
> {
  private toggleNavBar = () => {
    const nextNavBarState = this.getNextNavBarState();

    this.props.setNavBarState(nextNavBarState);
  };

  private getNextNavBarState = (): NavBarState => {
    const { navBarState } = this.props;
    if (navBarState === 'closed') {
      return 'halfOpen';
    }

    return 'closed';
  };

  public render() {
    return (
      <Wrapper>
        <StyledButton onClick={this.toggleNavBar}>
          <FontAwesomeIcon icon={faBars} />
        </StyledButton>
      </Wrapper>
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

export const EnhancedToggleNavBarButton = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  ReduxState
>(
  mapStateToProps,
  mapDispatchToProps,
)(ToggleNavBarButton);

export default EnhancedToggleNavBarButton;
