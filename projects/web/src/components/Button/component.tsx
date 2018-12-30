import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ClassNameProp } from '../../types';

const Wrapper = styled.button`
  display: inline-flex;

  border-radius: var(--sm-border-radius);
  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}

  ${props =>
    props.isPointerOver &&
    css`
      box-shadow: var(--xs-shadow);
    `};
`;

export type ButtonProps = Readonly<{
  label: string;
  type?: ButtonType;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
}> &
  Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onPointerDown'> &
  Partial<
    Pick<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'onPointerUp' | 'onPointerOver' | 'onPointerLeave'
    >
  > &
  ClassNameProp;

export type ButtonType = 'contained' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'accent' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export const Button: React.FunctionComponent<ButtonProps> = props => {
  const [isPointerOver, setIsPointerOver] = useState(false);

  const handlePointerOver: React.PointerEventHandler<
    HTMLButtonElement
  > = event => {
    setIsPointerOver(true);

    if (props.onPointerOver) {
      props.onPointerOver(event);
    }
  };

  const handlePointerLeave: React.PointerEventHandler<
    HTMLButtonElement
  > = event => {
    setIsPointerOver(false);

    if (props.onPointerLeave) {
      props.onPointerLeave(event);
    }
  };

  const [isPointerDown, setIsPointerDown] = useState(false);

  const handlePointerDown: React.PointerEventHandler<
    HTMLButtonElement
  > = event => {
    setIsPointerDown(true);

    if (props.onPointerDown) {
      props.onPointerDown(event);
    }
  };

  const handlePointerUp: React.PointerEventHandler<
    HTMLButtonElement
  > = event => {
    setIsPointerDown(false);

    if (props.onPointerUp) {
      props.onPointerUp(event);
    }
  };

  return (
    <Wrapper
      type={props.type}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={handlePointerOver}
      onPointerLeave={handlePointerLeave}
      isPointerOver={isPointerOver}
      isPointerDown={isPointerDown}
      disabled={props.disabled}
      className={props.className}
    >
      {props.label}
    </Wrapper>
  );
};

Button.defaultProps = {
  color: 'primary',
  size: 'medium',
  type: 'contained',
};

export default Button;
