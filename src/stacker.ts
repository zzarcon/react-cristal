export class Stacker {
  protected static maxIndex = 100;

  constructor() {
    
  }
  
  static getNextIndex(index?: number): number {
    if (index === Stacker.maxIndex) {
      return index;
    }

    Stacker.maxIndex++;

    return Stacker.maxIndex;
  }
}