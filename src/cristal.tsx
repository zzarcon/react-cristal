import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Component, ReactNode} from 'react';

import {Wrapper, Header, ResizeHandle, ContentWrapper} from './styled';

export interface CristalProps {
  children: ReactNode;
}

export interface CristalState {
  x: number;
  y: number;
  isDragging: boolean;
  isResizing: boolean;
  width?: number;
  height?: number;
}

const PADDING = 10;

export class Cristal extends Component<CristalProps, CristalState> {
  headerElement?: Element;
  childrenElement?: Element;

  state: CristalState = {
    x: 1,
    y: 1,
    isDragging: false,
    isResizing: false
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  saveWrapperRef = (el: Element) => {
    this.childrenElement = el;
    this.setInitialDimensions();
  }

  setInitialDimensions() {
    if (!this.childrenElement) return;

    const {width, height} = this.childrenElement.getBoundingClientRect();
    this.setState({
      width,
      height 
    });
  }

  saveHeaderRef = (el: Element) => {
    this.headerElement = el;
  }

  onMouseDown = () => {
    this.setState({
      isDragging: true
    });
  }

  onMouseMove = (e: MouseEvent) => {
    const {isDragging, isResizing, x, y, width: currentWidth, height: currentHeight} = this.state;
    const {movementX, movementY} = e;
    const {innerWidth, innerHeight} = window;
    const newX = x + movementX;
    const newY = y + movementY;
      
    if (isDragging) {
      const maxX = innerWidth - (currentWidth || 0) - PADDING;
      const maxY = innerHeight - (currentHeight || 0) - PADDING;

      this.setState({
        x: Math.min(Math.max(newX, PADDING), maxX),
        y: Math.min(Math.max(newY, PADDING), maxY)
      });
      return;
    }

    if (isResizing) {
      const newWidth = (currentWidth || 0) + movementX;
      const newHeight = (currentHeight || 0) + movementY;
      const maxHeight = innerHeight - newY - PADDING;
      const maxWidth = innerWidth - newX - PADDING;
      const height = newHeight > maxHeight ? currentHeight : newHeight;
      const width = newWidth > maxWidth ? currentWidth : newWidth;

      this.setState({
        width,
        height
      });
    }
  }

  onMouseUp = () => {
    this.setState({
      isDragging: false,
      isResizing: false
    });
  }

  onResizeStart = () => {
    this.setState({
      isResizing: true
    })
  }

  get header() {
    return (
      <Header innerRef={this.saveHeaderRef} onMouseDown={this.onMouseDown} />
    );
  }

  get content() {
    const {children} = this.props;

    return (
      <ContentWrapper>
        {children}
      </ContentWrapper>
    );
  }

  render() {
    const {x, y, width, height, isDragging, isResizing} = this.state;
    const isActive = isDragging || isResizing;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
      width, 
      height
    };
    const HeaderComponent = this.header;
    const ContentComponent = this.content;

    return ReactDOM.createPortal(
      <Wrapper
        style={style}
        innerRef={this.saveWrapperRef}
        isActive={isActive}
      >
        {HeaderComponent}
        {ContentComponent}
        <ResizeHandle
          onMouseDown={this.onResizeStart}
        />
      </Wrapper>,
      document.body
    );
  }
}