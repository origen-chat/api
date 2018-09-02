import React from 'react';
import styled from 'styled-components';

import { ClassNameProp } from '../../../../../../types';
import LoadingWorkspaceName from './LoadingWorkspaceName';

const Wrapper = styled.div`
  margin: 0 var(--sm-space);
`;

const DisplayName = styled.div`
  font-size: var(--lg-font-size);

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Name = styled.div`
  color: var(--tertiary-font-color);

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export type WorkspaceNameProps = Readonly<
  (
    | { loading: true }
    | {
        loading: false;
        name: string;
        displayName: string;
      }) &
    ClassNameProp
>;

export const WorkspaceName: React.SFC<WorkspaceNameProps> = props => {
  if (props.loading) {
    return (
      <Wrapper className={props.className}>
        <LoadingWorkspaceName />
      </Wrapper>
    );
  }

  return (
    <Wrapper className={props.className}>
      <DisplayName title={props.displayName}>{props.displayName}</DisplayName>
      <Name title={props.name}>{props.name}</Name>
    </Wrapper>
  );
};

export default WorkspaceName;
