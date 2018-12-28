import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import BarButton from '../BarButton';

export const WorkspaceOptionsButton: React.FunctionComponent = () => (
  <BarButton>
    <FontAwesomeIcon icon={faEllipsisV} />
  </BarButton>
);

export default WorkspaceOptionsButton;
