import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';


beforeEach(() => {
  localStorage.clear();
});

describe('useLocalStorage', () => {
  it('should initialize the value with the default value', () => {
    const defaultValue = 1;
    const { result } = renderHook(() => useLocalStorage('key', defaultValue));
    const [ value ] = result.current;
    expect(value).toBe(defaultValue);
  });

  it('should set a new value', () => {
    const expectedValue = 1;
    const { result } = renderHook(() => useLocalStorage('key', 0));
    const [ , setValue ] = result.current;
    act(() => setValue(expectedValue));
    expect(result.current[0]).toBe(expectedValue);
  });

  it('should set a new value with a function', () => {
    const initialValue = 5;
    const { result } = renderHook(() => useLocalStorage('key', initialValue));
    const [ , setValue ] = result.current;
    act(() => setValue((n: number) => n * 2));
    expect(result.current[0]).toBe(initialValue * 2);
  });

  it('should reset to initial value', () => {
    const initialValue = 1;
    const { result } = renderHook(() => useLocalStorage('key', initialValue));
    const [ , setValue, resetValue ] = result.current;
    act(() => setValue(2));
    expect(result.current[0]).toBe(2);
    act(() => resetValue());
    expect(result.current[0]).toBe(initialValue);
  });
});
