import styled from 'styled-components';
// @ts-ignore: unused variable
import {
  // @ts-ignore: unused variable
  HTMLAttributes,
  // @ts-ignore: unused variable
  ClassAttributes
} from 'react';

export interface WrapperProps {
  isActive: boolean;
}

export interface HeaderProps {
  isDraggable?: boolean
}

export const minWidth = 400;
export const minHeight = 225;
export const padding = 10;

const wrapperStyles = ({isActive}: WrapperProps) => {
  if (isActive) {
    return `
      
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
  min-width: ${minWidth}px;
  min-height: ${minHeight}px;
  user-select: none;
`;

export const Header = styled.div`
  height: 30px;
  border-bottom: 1px solid #ccc;
  cursor: ${({isDraggable}: HeaderProps) => isDraggable ? `-webkit-grab` : `default`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: ${padding}px;

`;

export const BottomRightResizeHandle = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: nwse-resize;
`;

export const ContentWrapper = styled.div`
  padding: ${padding}px;
`;

export const MinimizeIcon = styled.div`
  opacity: 0.3;
  position: relative;
  width: 15px;
  height: 15px;
  border-bottom: 2px solid #333;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }

`;
export const MaximizeIcon = styled.div`
  opacity: 0.3;
  position: relative;
  width: 15px;
  height: 15px;
  border: 2px solid #333;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }

`;

export const CloseIcon = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  opacity: 0.3;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &:before, &:after {
    position: absolute;
    right: 15px;
    content: ' ';
    height: 21px;
    width: 2px;
    background-color: #333;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export const TitleBtns = styled.div`
  display:flex;
  justify-content: space-between;
  width:90px;
`;

export const Title = styled.div`
  white-space: nowrap;
  max-width: calc(100% - 25px);
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RightResizeHandle = styled.div`
  width: 5px;
  height: calc(100% - 50px);
  position: absolute;
  bottom: 20px;
  right: 0;
  cursor: ew-resize;
`;

export const BottomResizeHandle = styled.div`
  width: calc(100% - 40px);
  height: 5px;
  position: absolute;
  bottom: 0;
  left: 20px;
  cursor: ns-resize;
`;
