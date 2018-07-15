import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Component, ReactNode} from 'react';
import {Wrapper, Header, BottomRightResizeHandle, RightResizeHandle, BottomResizeHandle, ContentWrapper, padding, CloseIcon, Title} from './styled';
import { InitialPosition, Size } from './domain';
import { getCordsFromInitialPosition, getBoundaryCoords } from './utils';
import { Stacker } from './stacker';

export interface CristalProps {
  children: ReactNode;
  title?: string;
  initialPosition?: InitialPosition;
  initialSize?: Size;
  isResizable?: boolean;
  isDraggable?: boolean;
  onClose?: () => void;
  onMove?: (state: CristalState) => void;
  onResize?: (state: CristalState) => void;
  className?: string;
}

export interface CristalState {
  x: number;
  y: number;
  isDragging: boolean;
  isResizingX: boolean;
  isResizingY: boolean;
  zIndex: number;
  width?: number;
  height?: number;
}

export class Cristal extends Component<CristalProps, CristalState> {
  headerElement?: Element;
  childrenElement?: Element;

  static defaultProps: CristalProps = {
    children: null,
    isResizable: true,
    isDraggable: true
  }

  state: CristalState = {
    x: padding,
    y: padding,
    isDragging: false,
    isResizingX: false,
    isResizingY: false,
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

    const {initialSize} = this.props;
    let width, height;

    if (initialSize) {
      width = initialSize.width;
      height = initialSize.height;
    } else {
      const rect = this.childrenElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    }

    this.setState({width, height});
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
    const {isDraggable} = this.props;
    if (!isDraggable) return;

    this.setState({
      isDragging: true
    });
  }

  onMouseMove = (e: MouseEvent) => {
    const {isResizing} = this;
    const {isDragging, x: currentX, y: currentY, width: currentWidth, height: currentHeight} = this.state;
    const {movementX, movementY} = e;
    const {innerWidth, innerHeight} = window;
    const newX = currentX + movementX;
    const newY = currentY + movementY;

    if (isDragging) {
      const size = currentWidth && currentHeight ? {width: currentWidth, height: currentHeight} : undefined;
      const {x, y} = getBoundaryCoords({x: newX, y: newY}, size);

      this.setState({ x, y }, this.notifyMove);
      
      return;
    }

    if (isResizing) {
      const {isResizingX, isResizingY} = this.state;

      if (isResizingX) {
        const maxWidth = innerWidth - newX - padding;
        const newWidth = (currentWidth || 0) + movementX;
        const width = newWidth > maxWidth ? currentWidth : newWidth;
        this.setState({width}, this.notifyResize);
      }

      if (isResizingY) {
        const newHeight = (currentHeight || 0) + movementY;
        const maxHeight = innerHeight - newY - padding;  
        const height = newHeight > maxHeight ? currentHeight : newHeight;
      
        this.setState({height}, this.notifyResize);
      }
    }
  }

  notifyMove = () => {
    const {onMove} = this.props;
    onMove && onMove(this.state);
  }

  notifyResize = () => {
    const {onResize} = this.props;

    if (onResize) {
      onResize(this.state);
    }
  }

  get isResizing(): boolean {
    const {isResizingX, isResizingY} = this.state;

    return isResizingX || isResizingY;
  }

  onMouseUp = () => {
    this.setState({
      isDragging: false,
      isResizingX: false,
      isResizingY: false,
    });
  }

  startFullResize = () => {
    // TODO: save cursor before start resizing
    // TODO: reset cursor after finish resizing
    // document.body.style.cursor = 'nwse-resize';

    this.setState({
      isResizingX: true,
      isResizingY: true
    });
  }

  startXResize = () => this.setState({isResizingX: true})

  startYResize = () => this.setState({isResizingY: true})

  get header() {
    const {onClose, title, isDraggable} = this.props;

    return (
      <Header isDraggable={isDraggable} innerRef={this.saveHeaderRef} onMouseDown={this.onMouseDown} >
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

  renderResizeHandles = () => {
    const {isResizable} = this.props;
    if (!isResizable) return;

    return [
      <RightResizeHandle
        key="right-resize"
        onMouseDown={this.startXResize}
      />,
      <BottomRightResizeHandle
        key="bottom-right-resize"
        onMouseDown={this.startFullResize}
      />,
      <BottomResizeHandle
        key="bottom-resize"
        onMouseDown={this.startYResize}
      />,
    ];
  }

  changeZIndex = () => {
    this.setState({
      zIndex: Stacker.getNextIndex()
    });
  }

  render() {
    const {isResizing} = this;
    const {x, y, width, height, isDragging, zIndex} = this.state;
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
        {this.renderResizeHandles()}
      </Wrapper>,
      document.body
    );
  }
}