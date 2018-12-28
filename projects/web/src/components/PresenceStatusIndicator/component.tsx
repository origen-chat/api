import React from 'react';
import styled from 'styled-components';

type StyledSpanProps = Readonly<{
  backgroundColor: string;
}>;

const StyledSpan = styled.span<StyledSpanProps>`
  display: inline-block;

  border-radius: var(--xl-border-radius);

  background-color: ${props => props.backgroundColor};
`;

export type PresenceStatusIndicatorProps = Readonly<{
  status: string;
}>;

export const PresenceStatusIndicator: React.FunctionComponent<
  PresenceStatusIndicatorProps
> = props => {
  const backgroundColor = getBackgroundColor(props.status);

  return <StyledSpan backgroundColor={backgroundColor} />;
};

function getBackgroundColor(
  status: PresenceStatusIndicatorProps['status'],
): string {
  if (status === 'online') {
    return 'green';
  }

  return 'grey';
}

export default PresenceStatusIndicator;
