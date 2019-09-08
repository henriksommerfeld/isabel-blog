const yaml = require('js-yaml');

module.exports.transformerRemarkParser = str => {
  const result = yaml.safeLoad(str);

  let toReturn = removeFeaturedImage(result);
  toReturn = removeImage(toReturn);
  toReturn = removeEmptyTags(toReturn);

  return toReturn;
};

function removeFeaturedImage(fields) {
  if (!fields.hasOwnProperty('featuredimage')) return fields;
  const { featuredimage, ...otherFields } = fields;
  return featuredimage ? fields : otherFields;
}

function removeImage(fields) {
  if (!fields.hasOwnProperty('image')) return fields;
  const { image, ...otherFields } = fields;
  return image ? fields : otherFields;
}

function removeEmptyTags(fields) {
  if (!fields.hasOwnProperty('tags')) return fields;
  const { tags, ...otherFields } = fields;
  const nonEmptyTags = tags.filter(t => t);
  return { ...otherFields, tags: nonEmptyTags };
}
