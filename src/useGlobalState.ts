import { useState, useEffect } from 'react';

export function useGlobalState(key: string, initialValue: any) {
  const [value, setLocalValue] = useState(initialValue);

  const setValue = newValue => {
    if (typeof sessionStorage === 'undefined') return;

    const serializedValue = JSON.stringify(newValue);
    sessionStorage.setItem(key, serializedValue);
  };

  const parseJson = (input: string) => {
    try {
      return input ? JSON.parse(input) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  useEffect(() => {
    const savedValue = sessionStorage.getItem(key);
    const deserializedValue = parseJson(savedValue);
    setLocalValue(deserializedValue);
    // installera eslint-regeln
  }, [sessionStorage.getItem(key)]);

  return [value, setValue];
}
