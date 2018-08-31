import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  Props as FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

import { StoreConsumer } from '../../../../../../components';
import { NavBarState, SetNavBarState } from '../../../../../../store';

const StyledButton = styled.button`
  background-color: transparent;
  border: none;

  color: var(--tertiary-font-color);
`;

export type BaseToggleWorkspacesBarButtonProps = Readonly<{
  navBarState: NavBarState;
  setNavBarState: SetNavBarState;
}>;

export const BaseToggleWorkspacesBarButton: React.SFC<
  BaseToggleWorkspacesBarButtonProps
> = props => {
  const handleClick = (): void => {
    if (props.navBarState === 'halfOpen') {
      props.setNavBarState('open');
    } else {
      props.setNavBarState('halfOpen');
    }
  };

  const icon: FontAwesomeIconProps['icon'] =
    props.navBarState === 'open' ? faChevronRight : faChevronLeft;

  return (
    <StyledButton onClick={handleClick}>
      <FontAwesomeIcon icon={icon} />
    </StyledButton>
  );
};

export const ToggleWorkspacesBarButton: React.SFC = () => (
  <StoreConsumer>
    {store => (
      <BaseToggleWorkspacesBarButton
        navBarState={store.state.navBarState}
        setNavBarState={store.actions.setNavBarState}
      />
    )}
  </StoreConsumer>
);

export default ToggleWorkspacesBarButton;
