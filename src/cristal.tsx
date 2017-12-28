import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Component} from 'react';
import CristalHeader from './header';
import CristalContent from './content';

import {Wrapper, Header, ResizeHandle} from './styled';

export interface CristalProps {
  children?: JSX.Element[];
}

export interface CristalState {
  x: number;
  y: number;
  isDragging: boolean;
  isResizing: boolean;
  width?: number;
  height?: number;
}

class Cristal extends Component<CristalProps, CristalState> {
  headerElement: Element;
  childrenElement: Element;

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
    // TODO: Find more robust way of getting the children
    this.childrenElement = el.children[1];
    this.setInitialDimensions();
  }

  setInitialDimensions() {
    const {width, height} = this.childrenElement.getBoundingClientRect();

    this.setState({
      width,
      height 
    });
  }

  saveHeaderRef = (el: Element) => {
    console.log(el)
    this.headerElement = el;
  }

  onMouseDown = () => {
    console.log(1)
    this.setState({
      isDragging: true
    });
  }

  onMouseMove = (e: MouseEvent) => {
    const {isDragging, isResizing} = this.state;
    const {movementX, movementY} = e;

    if (isDragging) {
      const {x, y} = this.state;
      // TODO: Find better place to 'getBoundingClientRect'
      const {width} = this.headerElement.getBoundingClientRect();
      const newX = x + movementX;
      const newY = y + movementY;

      this.setState({
        x: Math.max(newX, 0),
        y: Math.max(newY, 0)
      });
      return;
    }

    if (isResizing) {
      const {width, height} = this.state;
      const newWidth = width + movementX;
      const newHeight = height + movementY;

      this.setState({
        width: newWidth,
        height: newHeight
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
    const {children} = this.props;
    const customHeader = children[0];

    if (children.length && customHeader.type === CristalHeader) {
      // return <customHeader.type {...customHeader.props} onClick={(e) => console.log(e)} />
      return React.cloneElement(customHeader, {
        ref: this.saveHeaderRef,
        // innerRef: this.saveHeaderRef,
        onMouseDown: this.onMouseDown,
        onClick() {
          debugger
        }
      });
    }

    return <Header />;
  }

  get content() {
    const {children} = this.props;
    const customContent = children[1];

    if (children.length && customContent.type === CristalContent) {
      return customContent;
    }

    return children;
  }

  render() {
    const {children} = this.props;
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

export default Cristal;