import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { ClassNameProp } from '../../../../../types';
import {
  ChannelInfo as ChannelInfoQueryType,
  ChannelInfoVariables,
} from './__generatedTypes__/ChannelInfo';

const Wrapper = styled.div``;

const WorkspaceName = styled.div``;

export type BaseChannelInfoProps = Readonly<
  (
    | { loading: true }
    | ({
        loading: false;
        workspaceName: string;
      } & (
        | {
            channelType: 'named';
            channelName: string;
          }
        | {
            channelType: 'directMessages';
            channelMembers: any;
          }))) &
    ClassNameProp
>;

export const BaseChannelInfo: React.SFC<BaseChannelInfoProps> = props => {
  if (props.loading) {
    return null;
  }

  return (
    <Wrapper className={props.className}>
      <WorkspaceName>{props.workspaceName}</WorkspaceName>
      <div>channel name</div>
    </Wrapper>
  );
};

const channelInfoQuery = gql`
  query ChannelInfo($workspaceId: ID!, $channelId: ID!) {
    workspace(id: $workspaceId) {
      id
      channel(id: $channelId) {
        id
        type
        name
        members(first: 10) {
          edges {
            node {
              id
              username
              usernameIdentifier
            }
          }
        }
      }
    }
  }
`;

class ChannelInfoQuery extends Query<
  ChannelInfoQueryType,
  ChannelInfoVariables
> {}

export type ChannelInfoProps = ClassNameProp;

export const ChannelInfo: React.SFC<ChannelInfoProps> = props => (
  <Route
    render={({ match }) => (
      <ChannelInfoQuery
        query={channelInfoQuery}
        variables={{
          workspaceId: match.params.workspaceId,
          channelId: match.params.channelId,
        }}
      >
        {result => {
          const baseChannelInfoProps = makeBaseChannelInfoProps(result);

          return <BaseChannelInfo {...baseChannelInfoProps} />;
        }}
      </ChannelInfoQuery>
    )}
  />
);

function makeBaseChannelInfoProps(
  result: QueryResult<ChannelInfoQueryType, ChannelInfoVariables>,
): BaseChannelInfoProps {
  return { loading: true };
}

export default ChannelInfo;
