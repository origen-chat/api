import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { FirstWorkspace } from './__generatedTypes__/FirstWorkspace';

export type BaseHomeProps = Readonly<
  | { loading: true }
  | {
      loading: false;
      isAuthenticated: false;
    }
  | {
      loading: false;
      isAuthenticated: true;
      workspaceId: string;
      channelId: string;
      hasWorkspaces: true;
    }
  | {
      loading: false;
      isAuthenticated: true;
      hasWorkspaces: false;
    }
>;

export const BaseHome: React.FunctionComponent<BaseHomeProps> = props => {
  if (props.loading) {
    return <>loading</>;
  }

  if (!props.isAuthenticated) {
    return <Redirect to="/signin" />;
  }

  if (!props.hasWorkspaces) {
    return <Redirect to="/workspaces/add" />;
  }

  return <Redirect to={`${props.workspaceId}/messages/${props.channelId}`} />;
};

const firstWorkspaceQuery = gql`
  query FirstWorkspace {
    viewer {
      workspaces(first: 1) {
        totalCount
        edges {
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

class FirstWorkspaceQuery extends Query<FirstWorkspace> {}

const Home: React.FunctionComponent = () => (
  <FirstWorkspaceQuery query={firstWorkspaceQuery}>
    {result => {
      const baseHomeProps = makeBaseHomeProps(result);

      return <BaseHome {...baseHomeProps} />;
    }}
  </FirstWorkspaceQuery>
);

function makeBaseHomeProps(result: QueryResult<FirstWorkspace>): BaseHomeProps {
  if (result.loading) {
    return { loading: true };
  }

  if (result.error || !result.data) {
    return {
      loading: false,
      isAuthenticated: false,
    };
  }

  if (result.data.viewer.workspaces.totalCount === 0) {
    return {
      loading: false,
      isAuthenticated: true,
      hasWorkspaces: false,
    };
  }

  const workspaceId = result.data.viewer.workspaces.edges![0]!.node!.id;
  const channelId = result.data.viewer.workspaces.edges![0]!.node!
    .defaultChannel.id;

  return {
    loading: false,
    isAuthenticated: true,
    workspaceId,
    channelId,
    hasWorkspaces: true,
  };
}

export default Home;
