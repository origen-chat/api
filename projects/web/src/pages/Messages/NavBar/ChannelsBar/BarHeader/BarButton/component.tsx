import styled from 'styled-components';

const BarButton = styled.button`
  background-color: transparent;
  border: none;

  color: var(--tertiary-font-color);

  cursor: pointer;

  transition: var(--sm-transition);

  &:hover {
    color: var(--secondary-font-color);
  }
`;

export default BarButton;
