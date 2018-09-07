import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

import { StoreConsumer } from '../../../../../components';
import { NavBarState, SetNavBarState } from '../../../../../store';

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

export type BaseToggleNavBarButtonProps = Readonly<{
  navBarState: NavBarState;
  setNavBarState: SetNavBarState;
}>;

export class BaseToggleNavBarButton extends React.Component<
  BaseToggleNavBarButtonProps
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

export const ToggleNavBarButton: React.SFC = () => (
  <StoreConsumer>
    {store => (
      <BaseToggleNavBarButton
        navBarState={store.state.navBarState}
        setNavBarState={store.actions.setNavBarState}
      />
    )}
  </StoreConsumer>
);

export default ToggleNavBarButton;
