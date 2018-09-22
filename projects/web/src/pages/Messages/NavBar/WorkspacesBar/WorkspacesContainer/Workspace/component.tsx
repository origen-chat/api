import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';

import { ClassNameProp } from '../../../../../../types';
import BarButton, { BarButtonProps } from '../../BarButton';
import { Workspaces_viewer_workspaces_edges_node } from '../__generatedTypes__/Workspaces';
import LoadingWorkspace from './LoadingWorkspace';

const selectedStyle = css`
  border-width: 0.15rem;
  border-color: var(--secondary-color);
  border-style: solid;
`;

type StyledBarButtonProps = BarButtonProps &
  Readonly<{ isSelected: boolean; workspaceLogoUrl: string }>;

const StyledBarButton = styled<StyledBarButtonProps>(
  ({ isSelected, ...rest }) => <BarButton {...rest} />,
)`
  ${props => props.isSelected && selectedStyle};
  background-image: url(${props => props.workspaceLogoUrl});
  background-repeat: no-repeat;
  background-size: cover;
`;

export type WorkspaceProps = Readonly<
  (
    | { loading: true }
    | {
        loading: false;
        index: number;
        isSelected: boolean;
        workspace: Workspaces_viewer_workspaces_edges_node;
      }) &
    ClassNameProp
>;

export const Workspace: React.SFC<WorkspaceProps> = props => {
  if (props.loading) {
    return <LoadingWorkspace />;
  }

  const workspaceUrl = `/${props.workspace.id}/messages/${
    props.workspace.defaultChannel.id
  }`;

  return (
    <Draggable draggableId={props.workspace.id} index={props.index}>
      {provided => (
        <StyledBarButton
          isSelected={props.isSelected}
          to={workspaceUrl}
          title={props.workspace.name}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          workspaceLogoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2000px-Microsoft_logo.svg.png"
          className={props.className}
          domRef={provided.innerRef}
        />
      )}
    </Draggable>
  );
};

export default Workspace;
