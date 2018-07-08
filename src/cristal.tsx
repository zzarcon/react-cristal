import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Component, ReactNode} from 'react';
import {Wrapper, Header, ResizeHandle, ContentWrapper, padding, CloseIcon, Title} from './styled';
import { InitialPosition, Size } from './domain';
import { getCordsFromInitialPosition, getBoundaryCoords } from './utils';
import { Stacker } from './stacker';

export interface CristalProps {
  children: ReactNode;
  title?: string;
  initialPosition?: InitialPosition;
  isResizable?: boolean;
  onClose?: () => void;
  className?: string;
}

export interface CristalState {
  x: number;
  y: number;
  isDragging: boolean;
  isResizing: boolean;
  zIndex: number;
  width?: number;
  height?: number;
}

export class Cristal extends Component<CristalProps, CristalState> {
  headerElement?: Element;
  childrenElement?: Element;

  static defaultProps: CristalProps = {
    children: null,
    isResizable: true
  }

  state: CristalState = {
    x: padding,
    y: padding,
    isDragging: false,
    isResizing: false,
    zIndex: Stacker.getNextIndex()
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('resize', this.onWindowResize);
  }

  // TODO-PERF: debounce
  onWindowResize = () => {
    const {x, y, width, height} = this.state;
    const size = width && height ? {width, height} : undefined;
    const {x: newX, y: newY} = getBoundaryCoords({x, y}, size);

    this.setState({
      x: newX,
      y: newY
    });
  }

  saveWrapperRef = (el?: Element) => {
    this.childrenElement = el;
    if (!this.childrenElement) return;

    const {width, height} = this.childrenElement.getBoundingClientRect();
    this.setState({
      width,
      height 
    });

    this.setInitialPosition({width, height});
  }

  setInitialPosition = (size: Size) => {
    const {initialPosition} = this.props;
    if (!initialPosition) return;

    const cords = getCordsFromInitialPosition(initialPosition, size);
    const {x, y} = getBoundaryCoords(cords, size);

    this.setState({x, y});
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
    const {isDragging, isResizing, x: currentX, y: currentY, width: currentWidth, height: currentHeight} = this.state;
    const {movementX, movementY} = e;
    const {innerWidth, innerHeight} = window;
    const newX = currentX + movementX;
    const newY = currentY + movementY;
      
    if (isDragging) {
      const size = currentWidth && currentHeight ? {width: currentWidth, height: currentHeight} : undefined;
      const {x, y} = getBoundaryCoords({x: newX, y: newY}, size);

      this.setState({ x, y });

      return;
    }

    if (isResizing) {
      const newWidth = (currentWidth || 0) + movementX;
      const newHeight = (currentHeight || 0) + movementY;
      const maxHeight = innerHeight - newY - padding;
      const maxWidth = innerWidth - newX - padding;
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
    const {onClose, title} = this.props;

    return (
      <Header innerRef={this.saveHeaderRef} onMouseDown={this.onMouseDown} >
        <Title>{title}</Title>
        <CloseIcon onClick={onClose} />
      </Header>
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

  renderResizeHandle = () => {
    const {isResizable} = this.props;
    if (!isResizable) return;

    return (
      <ResizeHandle
        onMouseDown={this.onResizeStart}
      />
    );
  }

  changeZIndex = () => {
    this.setState({
      zIndex: Stacker.getNextIndex()
    });
  }

  render() {
    const {x, y, width, height, isDragging, isResizing, zIndex} = this.state;
    const {className} = this.props;
    const isActive = isDragging || isResizing;
    const style = {
      left: x,
      top: y,
      width, 
      height,
      zIndex
    };
    const HeaderComponent = this.header;
    const ContentComponent = this.content;

    // TODO: use "visibility"|"opacity" to avoid initial position glitch
    return ReactDOM.createPortal(
      <Wrapper
        style={style}
        innerRef={this.saveWrapperRef}
        isActive={isActive}
        className={className}
        onMouseDown={this.changeZIndex}
      >
        {HeaderComponent}
        {ContentComponent}
        {this.renderResizeHandle()}
      </Wrapper>,
      document.body
    );
  }
}