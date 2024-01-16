import { render, cleanup } from '@testing-library/react';
import Pagination from './Pagination';


const mockHandleClick = jest.fn();

afterEach(cleanup);

describe('Pagination', () => {
  it('should call the onClick handler with the first page', () => {
    const pagination = render(<Pagination current={3} length={10} onClick={mockHandleClick} />);
    const first = pagination.getByRole('button', {name: 'First page'});
    first.click();
    expect(mockHandleClick).toHaveBeenCalledWith(1);
  });

  it('should call the onClick handler with the previous page', () => {
    const pagination = render(<Pagination current={3} length={10} onClick={mockHandleClick} />);
    const previous = pagination.getByRole('button', {name: 'Previous page'});
    previous.click();
    expect(mockHandleClick).toHaveBeenCalledWith(2);
  });

  it('should call the onClick handler with a custom page number', () => {
    const pagination = render(<Pagination current={3} length={10} onClick={mockHandleClick} />);
    const four = pagination.getByText('4');
    four.click();
    expect(mockHandleClick).toHaveBeenCalledWith(4);
  });

  it('should call the onClick handler with the next page', () => {
    const pagination = render(<Pagination current={3} length={10} onClick={mockHandleClick} />);
    const next = pagination.getByRole('button', {name: 'Next page'});
    next.click();
    expect(mockHandleClick).toHaveBeenCalledWith(4);
  });

  it('should call the onClick handler with the last page', () => {
    const pagination = render(<Pagination current={3} length={10} onClick={mockHandleClick} />);
    const last = pagination.getByRole('button', {name: 'Last page'});
    last.click();
    expect(mockHandleClick).toHaveBeenCalledWith(10);
  });

  it('should NOT call the onClick handler with the current page', () => {
    const pagination = render(<Pagination current={3} length={10} onClick={mockHandleClick} />);
    const current = document.querySelector('[aria-current="page"]') as HTMLElement;
    current.click();
    expect(mockHandleClick).not.toHaveBeenCalled();
  });

  it('should NOT call the onClick handler with the first and previous page while it is the active one', () => {
    const pagination = render(<Pagination current={1} length={10} onClick={mockHandleClick} />);
    const disabled = document.querySelector('[aria-label="First page"]') as HTMLElement;
    const previous = document.querySelector('[aria-label="Previous page"]') as HTMLElement;
    disabled.click();
    previous.click();
    expect(mockHandleClick).not.toHaveBeenCalled();
  });
});
