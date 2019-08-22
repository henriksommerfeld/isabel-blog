const { removeBlogFromUrl } = require('./url-replacer');

describe('removeBlogFromUrl', () => {
  it('should remove /blog from url', () => {
    const input = '/blog/2019-08-21-youtube-test/';
    const expected = '/2019-08-21-youtube-test/';
    expect(removeBlogFromUrl(input)).toEqual(expected);
  });

  it('should return / for /', () => {
    expect(removeBlogFromUrl('/')).toEqual('/');
  });
});
