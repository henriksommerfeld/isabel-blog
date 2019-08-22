exports.removeBlogFromUrl = url => {
  const blogFragment = '/blog/';
  if (!url || !url.includes(blogFragment)) return url;

  const urlParts = url.split(blogFragment);
  return urlParts.length < 2 ? url : `/${urlParts[1]}`;
};
