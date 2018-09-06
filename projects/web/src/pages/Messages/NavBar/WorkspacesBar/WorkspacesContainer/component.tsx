import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { ClassNameProp } from '../../../../../types';
import {
  Workspaces,
  Workspaces_viewer_workspaces_edges_node,
} from './__generatedTypes__/Workspaces';
import Workspace from './Workspace';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;

  overflow-y: auto;
`;

const StyledWorkspace = styled(Workspace)`
  flex: 0 0 auto;
`;

export type BaseWorkapacesContainerProps = Readonly<
  (
    | { loading: true }
    | {
        loading: false;
        workspaces: ReadonlyArray<Workspaces_viewer_workspaces_edges_node>;
        selectedWorkspaceId: string;
        hasNextPage: boolean;
      }) &
    ClassNameProp
>;

export const BaseWorkapacesContainer: React.SFC<
  BaseWorkapacesContainerProps
> = props => {
  let workspaces: ReadonlyArray<React.ReactNode>;

  if (props.loading) {
    workspaces = [1, 2, 3].map(key => (
      <StyledWorkspace loading className={undefined} key={key} />
    ));
  } else {
    workspaces = props.workspaces.map(workspace => {
      const isSelected = props.selectedWorkspaceId === workspace.id;

      return (
        <StyledWorkspace
          // @ts-ignore
          isSelected={isSelected}
          workspace={workspace}
          loading={false}
          className={undefined}
          key={workspace.id}
        />
      );
    });
  }

  return <Wrapper className={props.className}>{workspaces}</Wrapper>;
};

const workspacesQuery = gql`
  query Workspaces {
    viewer {
      workspaces(first: 10) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            name
            defaultChannel {
              id
              name
            }
          }
        }
      }
    }
  }
`;

class WorkspacesQuery extends Query<Workspaces> {}

export type WorkspacesContainerProps = Partial<
  Pick<BaseWorkapacesContainerProps, 'className'>
>;

const WorkapacesContainer: React.SFC<WorkspacesContainerProps> = props => (
  <WorkspacesQuery query={workspacesQuery}>
    {result => (
      <Route
        render={({ match }) => {
          const baseWorkapacesContainerProps = makeBaseWorkspacesContainerProps(
            result,
            match.params,
            props,
          );

          return <BaseWorkapacesContainer {...baseWorkapacesContainerProps} />;
        }}
      />
    )}
  </WorkspacesQuery>
);

function makeBaseWorkspacesContainerProps(
  result: QueryResult<Workspaces>,
  matchParams: Readonly<{ workspaceId: string }>,
  props: WorkspacesContainerProps,
): BaseWorkapacesContainerProps {
  const { className } = props;

  if (result.loading) {
    return { loading: true, className };
  }

  if (result.error || !result.data || !result.data.viewer.workspaces.edges) {
    throw new Error('failed to load workspaces');
  }

  const workspaces = result.data.viewer.workspaces.edges
    .filter(edge => !!edge)
    .map(edge => edge!.node);

  const selectedWorkspaceId = matchParams.workspaceId;
  const { hasNextPage } = result.data.viewer.workspaces.pageInfo;

  return {
    loading: false,
    workspaces,
    selectedWorkspaceId,
    hasNextPage,
    className,
  };
}

export default WorkapacesContainer;
