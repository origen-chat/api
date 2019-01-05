import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ClassNameProp } from '../../types';

const Wrapper = styled.button`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;

  border-radius: var(--xxl-border-radius);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: var(--lg-letter-spacing);
  font-weight: var(--bold-font-weight);

  ${props =>
    (props.type as ButtonType) === 'contained' &&
    css`
      border-style: none;
    `}

  ${props =>
    (props.size as ButtonSize) === 'small' &&
    css`
      font-size: var(--xs-font-size);
      padding: 0 var(--sm-padding);
      height: 1.3rem;
    `}

  ${props =>
    (props.size as ButtonSize) === 'medium' &&
    css`
      font-size: var(--sm-font-size);
      padding: var(--sm-padding) var(--md-padding);
    `}

  ${props =>
    (props.size as ButtonSize) === 'large' &&
    css`
      font-size: var(--md-font-size);
      padding: var(--md-padding) var(--xl-padding);
    `}

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

const Label = styled.span`
  text-align: center;
`;

export type ButtonProps = Readonly<{
  label: string;
  type?: ButtonType;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
}> &
  Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> &
  Partial<
    Pick<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'onPointerDown' | 'onPointerUp' | 'onPointerOver' | 'onPointerLeave'
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
      size={props.size}
      color={props.color}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={handlePointerOver}
      onPointerLeave={handlePointerLeave}
      isPointerOver={isPointerOver}
      isPointerDown={isPointerDown}
      disabled={props.disabled}
      className={props.className}
      onClick={props.onClick}
    >
      <Label>{props.label}</Label>
    </Wrapper>
  );
};

Button.defaultProps = {
  color: 'primary',
  size: 'medium',
  type: 'contained',
};

export default Button;
