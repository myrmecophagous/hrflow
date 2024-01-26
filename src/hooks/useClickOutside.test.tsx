import { act, render } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';
import { RefObject, createRef, forwardRef, ForwardedRef } from 'react';


interface DummieComponentProps {
  callback: () => void;
}

const DummieComponent = forwardRef(
  function DummieComponent({callback}: DummieComponentProps, ref: ForwardedRef<HTMLDivElement>) {
    useClickOutside(ref as RefObject<HTMLDivElement>, callback);
    return (<div ref={ref}>Your ad could go here</div>);
  }
);

describe('useClickOutside', () => {
  it('should call the callback when clicking outside the element', () => {
    const callback = jest.fn();
    const ref = createRef<HTMLDivElement>();
    render(<DummieComponent callback={callback} ref={ref} />);

    act(() => {
      ref?.current?.click();
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      document.body.click();
    });
    expect(callback).toHaveBeenCalled();
  });
});
