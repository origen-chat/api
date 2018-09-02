import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import Channel from '../Channel';
import {
  WorkspaceNamedChannels,
  WorkspaceNamedChannels_viewer_channels_edges_node,
  WorkspaceNamedChannelsVariables,
} from './__generatedTypes__/WorkspaceNamedChannels';

const Wrapper = styled.div``;

const Heading = styled.div`
  margin: 0 var(--md-space) var(--md-space);
`;

export type BaseNamedChannelsProps = Readonly<
  | { loading: true }
  | {
      loading: false;
      channels: ReadonlyArray<
        WorkspaceNamedChannels_viewer_channels_edges_node
      >;
    }
>;

export const BaseNamedChannels: React.SFC<BaseNamedChannelsProps> = props => {
  let namedChannels: React.ReactNode;

  if (props.loading) {
    namedChannels = [1, 2, 3].map(key => <Channel loading key={key} />);
  } else {
    namedChannels = props.channels.map(channel => (
      <Channel
        loading={false}
        name={channel.name}
        viewerHasUnreadMessages={channel.viewerHasUnreadMessages}
      />
    ));
  }

  return (
    <Wrapper>
      <Heading>Channels</Heading>
      {namedChannels}
    </Wrapper>
  );
};

const namedChannelsQuery = gql`
  query WorkspaceNamedChannels($workspaceName: String!) {
    viewer {
      channels(workspaceName: $workspaceName, type: NAMED, first: 10) {
        edges {
          node {
            id
            name
            viewerHasUnreadMessages
          }
        }
      }
    }
  }
`;

class NamedChannelsQuery extends Query<
  WorkspaceNamedChannels,
  WorkspaceNamedChannelsVariables
> {}

export const NamedChannels: React.SFC = () => (
  <Route
    render={({ match }) => (
      <NamedChannelsQuery
        query={namedChannelsQuery}
        variables={{ workspaceName: match.params.workspaceName }}
      >
        {result => {
          const baseNamedChannelsProps = makeBaseNamedChannelsProps(result);

          return <BaseNamedChannels {...baseNamedChannelsProps} />;
        }}
      </NamedChannelsQuery>
    )}
  />
);

function makeBaseNamedChannelsProps(
  result: QueryResult<WorkspaceNamedChannels, WorkspaceNamedChannelsVariables>,
): BaseNamedChannelsProps {
  return { loading: true };
}

export default NamedChannels;
