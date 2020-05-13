const { toJsSafeArray } = require('./toJsSafe');

describe('toJsSafeArray', () => {
  it('should return empty array for null', () => {
    expect(toJsSafeArray(null)).toEqual([]);
  });

  it('should return empty array for object', () => {
    expect(toJsSafeArray({})).toEqual([]);
  });

  it('should return result of function', () => {
    const data = {};
    data.toJS = () => ['item 1'];
    expect(toJsSafeArray(data)).toEqual(['item 1']);
  });
});
