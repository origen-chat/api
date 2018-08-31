import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { SomethingWentWrongError } from '../../../../../errors';
import { Workspace, WorkspaceVariables } from './__generatedTypes__/Workspace';
import ToggleWorkspacesBarButton from './ToggleWorkspacesBarButton';
import WorkspaceName, { WorkspaceNameProps } from './WorkspaceName';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;
  align-content: center;

  width: 100%;
  height: var(--top-bar-height);

  padding: 0 var(--sm-space);
`;

const StyledWorkspaceName = styled(WorkspaceName)`
  flex: 1 1 auto;
`;

export type BaseBarHeaderProps = Readonly<
  | { loading: true }
  | {
      loading: false;
      workspaceName: string;
      workspaceDisplayName: string;
    }
>;

export const BaseBarHeader: React.SFC<BaseBarHeaderProps> = props => {
  const workspaceNameProps: WorkspaceNameProps = props.loading
    ? { loading: true }
    : {
        loading: false,
        name: props.workspaceName,
        displayName: props.workspaceDisplayName,
      };

  return (
    <Wrapper>
      <ToggleWorkspacesBarButton />
      <StyledWorkspaceName {...workspaceNameProps} />
    </Wrapper>
  );
};

const workspaceQuery = gql`
  query Workspace($workspaceName: String!) {
    workspace(name: $workspaceName) {
      id
      name
      displayName
    }
  }
`;

class WorkspaceQuery extends Query<Workspace, WorkspaceVariables> {}

export const ChannelsBar: React.SFC = () => (
  <Route
    render={({ match }) => (
      <WorkspaceQuery
        query={workspaceQuery}
        variables={{ workspaceName: match.params.workspaceName }}
      >
        {result => {
          const baseBarHeaderProps = makeBaseBarHeaderProps(result);

          return <BaseBarHeader {...baseBarHeaderProps} />;
        }}
      </WorkspaceQuery>
    )}
  />
);

function makeBaseBarHeaderProps(
  result: QueryResult<Workspace, WorkspaceVariables>,
): BaseBarHeaderProps {
  if (result.loading) {
    return { loading: true };
  }

  if (result.error) {
    throw result.error;
  }

  if (!result.data) {
    throw new SomethingWentWrongError();
  }

  const {
    name: workspaceName,
    displayName: workspaceDisplayName,
  } = result.data.workspace;

  return {
    loading: false,
    workspaceName,
    workspaceDisplayName,
  };
}

export default ChannelsBar;
