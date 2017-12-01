import * as React from 'react';
import {Component} from 'react';
import {Wrapper} from './styled';

export interface CristalProps {

}

export interface CristalState {
  x: number;
  y: number;
  isDragging: boolean;
}

class Cristal extends Component<CristalProps, CristalState> {
  wrapperElement: Element;

  state: CristalState = {
    isDragging: false
  }

  onDragStart = () => {
    console.log('start')
  }

  componentDidMount() {
    document.addEventListener('drag', (e) => {

    }, false);

    document.addEventListener('dragstart', (e) => {
      const img = new Image();
      const {dataTransfer} = e;
      console.log(dataTransfer.effectAllowed)
      dataTransfer.effectAllowed = 'move';
      dataTransfer.setData('text/html', '');
      e.dataTransfer.setDragImage(img, 0, 0);
      this.setState({
        isDragging: true
      });
    }, false);

    document.addEventListener('dragover', (e) => {
      // this.setState({
      //   isDragging: true,
      //   // x: event.clientX,
      //   // y: event.clientY
      // });
      // debugger
      // console.log(event.clientX, event.clientY)
      // console.log(event.target)
      // console.log('over', this.wrapperElement)
      // prevent default to allow drop
      e.preventDefault();
    }, false);

    document.addEventListener('dragend', (e) => {
      this.setState({
        isDragging: false,
        x: e.clientX,
        y: e.clientY
      });
    }, false);
  }

  saveWrapperRef = (el: Element) => {
    this.wrapperElement = el;
  }

  render() {
    const {children} = this.props;
    const {x, y, isDragging} = this.state;
    const style = {
      transform: `translate(${x}px, ${y}px)`
    };
    console.log(style);

    return (
      <Wrapper 
        _style={style}
        innerRef={this.saveWrapperRef}
        onDragStart={this.onDragStart}
        isDragging={isDragging}
        draggable
      >
        {children}
      </Wrapper>
    );
  }
}

export default Cristal;