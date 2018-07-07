import { minHeight, minWidth, padding } from "./styled";
import { Coords, Size, InitialPosition } from "./domain";

export const getBoundaryCoords = (coords: Coords, size: Size = {width: minWidth, height: minHeight}): Coords => {
  const {x, y} = coords;
  const {width, height} = size;
  const {innerWidth, innerHeight} = window;
  const maxX = innerWidth - (width || 0) - padding;
  const maxY = innerHeight - (height || 0) - padding;

  return {
    x: Math.min(Math.max(x, padding), maxX),
    y: Math.min(Math.max(y, padding), maxY)
  }
};

export  const getCordsFromInitialPosition = (initialPosition?: InitialPosition): Coords => {
  switch (initialPosition) {
    case 'top-left': default:
      return {x: 10, y: 10};
    case 'top-right': 
      return {x: Infinity, y: 10};
    case 'bottom-left':
      return {x: 10, y: Infinity};
    case 'bottom-right':
      return {x: Infinity, y: Infinity};
  }
}