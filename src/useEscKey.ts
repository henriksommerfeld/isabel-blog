import { useEffect, useCallback } from 'react';

export const useEscKey = action => {
  const keyDownHandler = useCallback(
    keyboardEvent => {
      if (isEscape(keyboardEvent) && isFunction(action)) action();
    },
    [action]
  );

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyDownHandler]);
};

const isFunction = f => typeof f === 'function';
const isEscape = keyEvent => keyEvent && keyEvent.key === 'Escape';
