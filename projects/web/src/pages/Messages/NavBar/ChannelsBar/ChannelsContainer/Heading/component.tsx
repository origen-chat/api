import styled from 'styled-components';

const Heading = styled.button`
  padding: 0 var(--md-space);
  width: 100%;

  text-align: start;
  color: var(--secondary-font-color);

  border: none;
  background-color: transparent;

  cursor: pointer;

  transition: var(--sm-transition);

  &:hover {
    color: var(--primary-font-color);
  }
`;

export default Heading;
