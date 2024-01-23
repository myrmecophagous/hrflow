import { useState, useCallback } from 'react';


export function useLocalStorage<T>(key: string, initialValue: T) {
  const [localValue, setLocalValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return (item !== null ? JSON.parse(item) : initialValue);
  });

  const resetValue = useCallback(() => {
    localStorage.removeItem(key);
    setLocalValue(initialValue);
  }, [key, initialValue]);

  const setValue = useCallback((value: T | ((v: T) => T)) => {
    const item = value instanceof Function ? value(localValue) : value;
    setLocalValue(item);
    localStorage.setItem(key, JSON.stringify(item));
  }, [key, localValue]);

  return [localValue, setValue, resetValue] as const;
}
