import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import LoadingChannel from './LoadingChannel';

const Wrapper = styled.div`
  margin: var(--md-space) 0;
`;

export type BaseChannelProps = Readonly<
  | {
      loading: true;
    }
  | {
      loading: false;
      name: string;
      viewerHasUnreadMessages: boolean;
    }
>;

export const BaseChannel: React.FunctionComponent<BaseChannelProps> = props => {
  let channel: React.ReactNode;
  if (props.loading) {
    channel = <LoadingChannel />;
  } else {
    channel = <div>{props.name}</div>;
  }

  return <Wrapper>{channel}</Wrapper>;
};

export type ChannelProps = BaseChannelProps;

export const Channel: React.FunctionComponent<ChannelProps> = () => (
  <Route
    render={({ match }) => {
      const baseChannelProps = makeBaseChannelProps(match.params);

      return <BaseChannel {...baseChannelProps} />;
    }}
  />
);

function makeBaseChannelProps(params: {}): BaseChannelProps {
  return { loading: true };
}

export default Channel;
