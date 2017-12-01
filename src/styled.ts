import styled from 'styled-components';

export interface WrapperProps {
  isDragging: boolean;
}

const wrapperStyles = ({isDragging}: WrapperProps) => {
  console.log('wrapperStyles', isDragging)
  if (isDragging) {
    return `opacity: 0;`;
  }

  return `opacity: 1;`;
};

export const Wrapper = styled.div`
  ${wrapperStyles}
  position: fixed;
  display: inline-flex;
  border: 1px solid black;
  padding: 10px;
`;