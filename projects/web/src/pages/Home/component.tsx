import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

export type BaseHomeProps = Readonly<
  | {
      isAuthenticated: false;
    }
  | {
      isAuthenticated: true;
      workspaceName: string;
      channelName: string;
      workspaceTotalCount: number;
    }
>;

export const BaseHome: React.SFC<BaseHomeProps> = props => {
  if (!props.isAuthenticated) {
    return <Redirect to="/signup" />;
  }

  if (props.workspaceTotalCount > 0) {
    return (
      <Redirect to={`${props.workspaceName}/messages/${props.channelName}`} />
    );
  }

  return <Redirect to="/workspaces/add" />;
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

const Home: React.SFC = () => (
  <Query query={firstWorkspaceQuery}>
    {result => {
      const props = makeBaseHomeProps(result);

      return <BaseHome {...props} />;
    }}
  </Query>
);

function makeBaseHomeProps(result: any): BaseHomeProps {
  return {
    isAuthenticated: true,
    workspaceName: 'test',
    channelName: 'test',
    workspaceTotalCount: 10,
  };
}

export default Home;
