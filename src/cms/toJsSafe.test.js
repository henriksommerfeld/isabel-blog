const {
  toJsSafeArray
} = require('./toJsSafe');

describe('toJsSafeArray', () => {
  it('should return empty array for null', () => {
    expect(toJsSafeArray(null)).toEqual([]);
  });

  it('should return empty array for object', () => {
    expect(toJsSafeArray({})).toEqual([]);
  });
});