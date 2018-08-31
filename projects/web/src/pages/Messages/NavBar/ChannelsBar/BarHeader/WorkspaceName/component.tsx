import React from 'react';
import styled from 'styled-components';

import LoadingWorkspaceName from './LoadingWorkspaceName';

const Wrapper = styled.div`
  margin: 0 var(--md-space);
`;

const DisplayName = styled.div`
  font-size: var(--lg-font-size);
`;

const Name = styled.div`
  color: var(--tertiary-font-color);
`;

export type WorkspaceNameProps = Readonly<
  | { loading: true }
  | {
      loading: false;
      name: string;
      displayName: string;
    }
>;

export const WorkspaceName: React.SFC<WorkspaceNameProps> = props => {
  if (props.loading) {
    return (
      <Wrapper>
        <LoadingWorkspaceName />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <DisplayName>{props.displayName}</DisplayName>
      <Name>{props.name}</Name>
    </Wrapper>
  );
};

export default WorkspaceName;
