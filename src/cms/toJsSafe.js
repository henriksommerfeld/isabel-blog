exports.toJsSafe = (rawData) => {
  return (rawData && rawData.toJS()) || {};
};

exports.toJsSafeArray = (rawData) => {
  return (rawData && isFunction(rawData.toJS) && rawData.toJS()) || [];
};

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
}
