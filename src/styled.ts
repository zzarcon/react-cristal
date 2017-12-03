import styled from 'styled-components';

export interface WrapperProps {
  isActive: boolean;
}

const wrapperStyles = ({isActive}: WrapperProps) => {
  if (isActive) {
    return `
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

export const ResizeHandle = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: nwse-resize;
`;