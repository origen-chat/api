import React from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ClassNameProp } from '../../../../../types';
import { barButtonStyle } from './styles';

const StyledLink = styled(({ domRef, ...rest }: any) => (
  <Link {...rest} innerRef={domRef} />
))`
  ${barButtonStyle};
`;

export type BarButtonProps = Readonly<{
  to: string;
  title?: string;
  domRef?: (element: HTMLElement | null) => any;
}> &
  ((DraggableProvidedDraggableProps & DraggableProvidedDragHandleProps) | {}) &
  ClassNameProp;

export const BarButton: React.SFC<BarButtonProps> = props => (
  <StyledLink {...props}>{props.children}</StyledLink>
);

export default BarButton;
