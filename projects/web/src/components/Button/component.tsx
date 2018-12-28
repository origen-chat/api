import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  padding: var(--xs-space);

  border-radius: var(--sm-border-radius);
`;

export type ButtonProps = Readonly<{
  onPointerDown: React.EventHandler<React.PointerEvent>;
  text: string;
  type: ButtonType;
  deactivated?: boolean;
}>;

export type ButtonType = 'primary' | 'secondary' | 'danger';

export const Button: React.FunctionComponent<ButtonProps> = props => {
  return <Wrapper>{props.text}</Wrapper>;
};

export default Button;
