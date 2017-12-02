import * as React from 'react';
import {Component} from 'react';
import {Wrapper, Header} from './styled';

export interface CristalProps {

}

export interface CristalState {
  x: number;
  y: number;
  isDragging: boolean;
}

class Cristal extends Component<CristalProps, CristalState> {
  wrapperElement: Element;
  headerElement: Element;

  state: CristalState = {
    x: 1,
    y: 1,
    isDragging: false
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onDragStart = () => {
    console.log('start')
  }

  saveWrapperRef = (el: Element) => {
    this.wrapperElement = el;
  }

  saveHeaderRef = (el: Element) => {
    this.headerElement = el;
    // this.headerDimensions = el.getBoundingClientRect();
  }

  onMouseDown = () => {
    this.setState({
      isDragging: true
    })
    console.log('onMouseDown')
  }

  onMouseMove = (e: MouseEvent) => {
    const {isDragging, x, y} = this.state;
    if (!isDragging) return;

    const {movementX, movementY} = e;
    // TODO: Find better place to 'getBoundingClientRect'
    const {width} = this.headerElement.getBoundingClientRect();
    const newX = x + movementX;
    const newY = y + movementY;

    this.setState({
      x: Math.max(newX, 0),
      y: Math.max(newY, 0)
    });
  }

  onMouseLeave = () => {
    this.setState({
      isDragging: false
    });
  }

  onMouseUp = () => {
    this.setState({
      isDragging: false
    });
  }

  render() {
    const {children} = this.props;
    const {x, y, isDragging} = this.state;
    const style = {
      transform: `translate(${x}px, ${y}px)`
    };

    return (
      <Wrapper 
        style={style}
        innerRef={this.saveWrapperRef}
        isDragging={isDragging}
      >
        <Header
          innerRef={this.saveHeaderRef}
          onMouseDown={this.onMouseDown}
        >
        </Header>
        {children}
      </Wrapper>
    );
  }
}

export default Cristal;