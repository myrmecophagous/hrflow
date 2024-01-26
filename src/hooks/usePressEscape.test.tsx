import { usePressEscape } from "./usePressEscape";
import { renderHook } from '@testing-library/react';


describe('usePressEscape', () => {
  it('should call the callback when pressing escape', () => {
    const callback = jest.fn();
    renderHook(() => usePressEscape(callback));

    const event = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(event);
    expect(callback).toHaveBeenCalled();
  });
});
