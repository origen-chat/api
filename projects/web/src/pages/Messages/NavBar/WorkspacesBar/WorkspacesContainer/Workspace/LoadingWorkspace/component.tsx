import styled from 'styled-components';

import { barButtonStyle } from '../../../BarButton';

export const LoadingWorkspace = styled.div`
  ${barButtonStyle};

  background-color: var(--grey);

  &:hover {
    box-shadow: none;
  }
`;

export default LoadingWorkspace;
