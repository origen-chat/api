import React from 'react';
import styled, { css } from 'styled-components';

import { ClassNameProp } from '../../../../../../types';
import BarButton, { BarButtonProps } from '../../BarButton';
import { Workspaces_viewer_workspaces_edges_node } from '../__generatedTypes__/Workspaces';

const selectedStyle = css`
  border-width: 0.15rem;
  border-color: var(--secondary-color);
  border-style: solid;
`;

type StyledBarButtonProps = BarButtonProps & Readonly<{ isSelected: boolean }>;

const StyledBarButton = styled<StyledBarButtonProps>(
  ({ isSelected, ...rest }) => <BarButton {...rest} />,
)`
  ${props => props.isSelected && selectedStyle};
`;

const WorkspaceImage = styled.img`
  width: 100%;
  height: 100%;
`;

export type WorkspaceProps = Readonly<
  (
    | { loading: true }
    | {
        loading: false;
        isSelected: boolean;
        workspace: Workspaces_viewer_workspaces_edges_node;
      }) &
    ClassNameProp
>;

export const Workspace: React.SFC<WorkspaceProps> = props => {
  if (props.loading) {
    return <>loading</>;
  }

  const workspaceUrl = `/${props.workspace.name}/messages/${
    props.workspace.defaultChannel.name
  }`;

  return (
    <StyledBarButton
      isSelected={props.isSelected}
      to={workspaceUrl}
      className={props.className}
      title={props.workspace.name}
    >
      <WorkspaceImage src="http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png" />
    </StyledBarButton>
  );
};

export default Workspace;
