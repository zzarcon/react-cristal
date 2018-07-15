export type InitialPosition = 
'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center';

export interface Coords {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export const isSmartPosition = (position: InitialPosition | Coords): position is InitialPosition =>  {
  return typeof position === 'string';
}