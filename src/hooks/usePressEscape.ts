import { useEffect, useCallback } from 'react';


export function usePressEscape(callback: () => void) {
  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      callback();
    }
  }, [callback]);

  useEffect(() => {
    document.addEventListener('keyup', (e) => handleKeyUp(e as unknown as KeyboardEvent));
    return () => {
      document.removeEventListener('keyup', (e) => handleKeyUp(e as unknown as KeyboardEvent));
    };
  }, [handleKeyUp]);
}
