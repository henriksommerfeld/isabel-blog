const yaml = require('js-yaml');

module.exports.removeEmptyImageFieldsParser = str => {
  const result = yaml.safeLoad(str);
  console.log('TCL: result', result);

  let toReturn = removeFeaturedImage(result);
  console.log('TCL: toReturn', toReturn);
  toReturn = removeImage(toReturn);
  console.log('TCL: toReturn', toReturn);

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
