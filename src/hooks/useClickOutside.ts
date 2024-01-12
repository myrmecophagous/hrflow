import { useEffect, RefObject, useCallback } from 'react';


export function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void) {
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  }, [ref, callback]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref, handleClickOutside]);
}
