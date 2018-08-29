import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { ClassNameProp } from '../../../../types';
import {
  Workspaces,
  Workspaces_viewer_workspaces_edges_node,
} from './__generatedTypes__/Workspaces';
import Workspace from './Workspace';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
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
        selectedWorkspace: string;
        hasNextPage: boolean;
      }) &
    ClassNameProp
>;

export const BaseWorkapacesContainer: React.SFC<
  BaseWorkapacesContainerProps
> = props => {
  let workspaces: ReadonlyArray<React.ReactNode>;

  if (props.loading) {
    // @ts-ignore
    workspaces = [1, 2, 3].map(key => <StyledWorkspace loading key={key} />);
  } else {
    workspaces = props.workspaces.map(workspace => {
      const isSelected = props.selectedWorkspace === workspace.name;

      return (
        // @ts-ignore
        <StyledWorkspace
          isSelected={isSelected}
          workspace={workspace}
          loading={false}
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
          const baseWorkapacesContainerProps = makeBaseWorkspacesContainer(
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

function makeBaseWorkspacesContainer(
  result: QueryResult<Workspaces>,
  matchParams: Readonly<{ workspace: string }>,
  props: WorkspacesContainerProps,
): BaseWorkapacesContainerProps {
  if (result.loading) {
    return { loading: true, className: props.className };
  }

  if (result.error || !result.data) {
    throw new Error('failed to load workspaces');
  }

  const workspaces = result.data.viewer.workspaces.edges!.map(
    edge => edge!.node,
  );

  const selectedWorkspace = matchParams.workspace;
  const { hasNextPage } = result.data.viewer.workspaces.pageInfo;

  return {
    loading: false,
    workspaces,
    selectedWorkspace,
    hasNextPage,
    className: props.className,
  };
}

export default WorkapacesContainer;
