import styled from 'styled-components';

export interface WrapperProps {
  isDragging: boolean;
}

const wrapperStyles = ({isDragging}: WrapperProps) => {
  if (isDragging) {
    return `
      background-color: lightblue;
      user-select: none;
    `;
  }

  return `opacity: 1;`;
};

export const Wrapper = styled.div`
  ${wrapperStyles}
  position: fixed;
  display: inline-flex;
  flex-direction: column;
  border: 1px solid black;
`;

export const Header = styled.div`
  height: 30px;
  border-bottom: 1px solid black;
  cursor: -webkit-grab;
`;