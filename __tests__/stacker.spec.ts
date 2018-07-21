import {Stacker} from '../src/stacker';

describe('Stacker', () => {
  it('should return a valid next index', () => {
    expect(Stacker.getNextIndex()).toEqual(101);
    expect(Stacker.getNextIndex()).toEqual(102);
  });

  it('should return the same index if the given one is the max index', () => {
    const index1 = Stacker.getNextIndex();
    const index2 = Stacker.getNextIndex();
    const index3 = Stacker.getNextIndex(index2);
    const index4 = Stacker.getNextIndex(index1);

    expect(index2).toBeGreaterThan(index1);
    expect(index3).toEqual(index2);
    expect(index4).toBeGreaterThan(index3);
  });
});