import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { FirstWorkspace } from './__generatedTypes__/FirstWorkspace';

export type BaseHomeProps = Readonly<
  | {
      isAuthenticated: false;
    }
  | {
      isAuthenticated: true;
      workspaceName: string;
      channelName: string;
      hasWorkspaces: true;
    }
  | {
      isAuthenticated: true;
      hasWorkspaces: false;
    }
>;

export const BaseHome: React.SFC<BaseHomeProps> = props => {
  if (!props.isAuthenticated) {
    return <Redirect to="/signup" />;
  }

  if (!props.hasWorkspaces) {
    return <Redirect to="/workspaces/add" />;
  }

  return (
    <Redirect to={`${props.workspaceName}/messages/${props.channelName}`} />
  );
};

const firstWorkspaceQuery = gql`
  query FirstWorkspace {
    viewer {
      workspaces(first: 1) {
        totalCount
        edges {
          node {
            name
            defaultChannel {
              name
            }
          }
        }
      }
    }
  }
`;

class FirstWorkspaceQuery extends Query<FirstWorkspace> {}

const Home: React.SFC = () => (
  <FirstWorkspaceQuery query={firstWorkspaceQuery}>
    {result => {
      const baseHomeProps = makeBaseHomeProps(result);

      return <BaseHome {...baseHomeProps} />;
    }}
  </FirstWorkspaceQuery>
);

function makeBaseHomeProps(result: QueryResult<FirstWorkspace>): BaseHomeProps {
  if (!result.error || !result.data) {
    return {
      isAuthenticated: false,
    };
  }

  if (result.data.viewer.workspaces.totalCount === 0) {
    return {
      isAuthenticated: true,
      hasWorkspaces: false,
    };
  }

  return {
    isAuthenticated: true,
    workspaceName: 'test',
    channelName: 'test',
    hasWorkspaces: true,
  };
}

export default Home;
