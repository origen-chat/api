import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  Props as FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  navBarActions,
  navBarSelectors,
  NavBarState,
  ReduxState,
} from '../../../../../../modules';
import BarButton from '../BarButton';

export type ToggleWorkspacesBarButtonProps = StateProps &
  DispatchProps &
  OwnProps;

type OwnProps = Readonly<{}>;

export const ToggleWorkspacesBarButton: React.FunctionComponent<
  ToggleWorkspacesBarButtonProps
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
    <BarButton onClick={handleClick}>
      <FontAwesomeIcon icon={icon} />
    </BarButton>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  navBarState: navBarSelectors.getNavBarState(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNavBarState: (state: NavBarState) =>
    dispatch(navBarActions.setState(state)),
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export const EnhancedToggleWorkspacesBarButton = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  ReduxState
>(
  mapStateToProps,
  mapDispatchToProps,
)(ToggleWorkspacesBarButton);

export default EnhancedToggleWorkspacesBarButton;
