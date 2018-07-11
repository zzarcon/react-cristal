import {Stacker} from '../src/stacker';

describe('Stacker', () => {
  it('should return a valid next index', () => {
    expect(Stacker.getNextIndex()).toEqual(101);
    expect(Stacker.getNextIndex()).toEqual(102);
  });
});