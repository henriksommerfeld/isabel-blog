import React, { Dispatch } from 'react';

export function useStateWithLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<React.SetStateAction<T>>] {
  const storedValue = localStorage.getItem(key);
  const parsedValue = parseValue(storedValue);
  const [value, setValue] = React.useState(parsedValue);

  function parseValue(v: string) {
    return JSON.parse(v) || defaultValue;
  }

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
}
