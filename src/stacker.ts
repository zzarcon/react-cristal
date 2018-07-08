export class Stacker {
  protected static maxIndex = 100;

  constructor() {
    
  }
  
  static getNextIndex(): number {
    Stacker.maxIndex++;

    return Stacker.maxIndex;
  }
}