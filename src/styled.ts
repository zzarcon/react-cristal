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
  background: white;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 5px, rgba(0, 0, 0, 0.1) 0px 1px 1px;
  min-width: 400px;
  min-height: 225px;
`;

export const Header = styled.div`
  height: 30px;
  border-bottom: 1px solid #ccc;
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

export const ContentWrapper = styled.div`
  padding: 10px;
`;