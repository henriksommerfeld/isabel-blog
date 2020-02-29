export function toJsSafe(rawData) {
  return (rawData && rawData.toJS()) || {};
}

export function toJsSafeArray(rawData) {
  return (rawData && isFunction(rawData.toJS) && rawData.toJS()) || [];
}

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}