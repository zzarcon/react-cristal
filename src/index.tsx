import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Component} from 'react';
import {Wrapper, Header, ResizeHandle} from './styled';

export interface CristalProps {
  header?: JSX.Element;
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
    this.headerElement = el;
  }

  onMouseDown = () => {
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
    });
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

    return ReactDOM.createPortal(
      <Wrapper
        style={style}
        innerRef={this.saveWrapperRef}
        isActive={isActive}
      >
        <Header
          innerRef={this.saveHeaderRef}
          onMouseDown={this.onMouseDown}
        >
        </Header>
        {children}
        <ResizeHandle
          onMouseDown={this.onResizeStart}
        />
      </Wrapper>,
      document.body
    );
  }
}

export default Cristal;