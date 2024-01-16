import { render, cleanup } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';

import SearchBar from './SearchBar';


afterEach(cleanup);


describe('SearchBar', () => {
  const user = userEvent.setup();
  const handleSearchMock = jest.fn();
  const handleCategoryMock = jest.fn();
  const handleResetMock = jest.fn();
  const handleSortMock = jest.fn();
  const handleSortOrdeMock = jest.fn();

  describe('Search input', () => {
    it('should trigger handleSearch event on input', async () => {
      const searchBar = render(<SearchBar
        categories={[{ label: 'test', value: 'test' }]}
        filter=""
        handleCategory={handleCategoryMock}
        handleReset={handleResetMock}
        handleSearch={handleSearchMock}
        handleSort={handleSortMock}
        handleSortOrder={handleSortOrdeMock}
        selectedCategory=""
        selectedSort=""
        selectedSortOrder={1}
      />);
      const input = searchBar.getByLabelText('Search');
      await user.type(input, 'test');
      expect(handleSearchMock).toHaveBeenCalledTimes(4);
    });
  });

  describe('Category select', () => {
    it('should trigger handleCategory event on change', async () => {
      const searchBar = render(<SearchBar
        categories={[{ label: 'test', value: 'test' }]}
        filter=""
        handleCategory={handleCategoryMock}
        handleReset={handleResetMock}
        handleSearch={handleSearchMock}
        handleSort={handleSortMock}
        handleSortOrder={handleSortOrdeMock}
        selectedCategory=""
        selectedSort=""
        selectedSortOrder={1}
      />);
      const select = searchBar.getByLabelText('Category');
      await user.selectOptions(select, 'test');
      expect(handleCategoryMock).toHaveBeenCalledWith('test');
    });
  });

  describe('Sort select', () => {
    it('should trigger handleSort event on change', async () => {
      const searchBar = render(<SearchBar
        categories={[{ label: 'test', value: 'test' }]}
        filter=""
        handleCategory={handleCategoryMock}
        handleReset={handleResetMock}
        handleSearch={handleSearchMock}
        handleSort={handleSortMock}
        handleSortOrder={handleSortOrdeMock}
        selectedCategory=""
        selectedSort=""
        selectedSortOrder={1}
      />);
      const select = searchBar.getByLabelText('Sort by');
      await user.selectOptions(select, 'Date');
      expect(handleSortMock).toHaveBeenCalledWith('created_at');
    });
  });

  describe('Sort Order select', () => {
    it('should be disabled when Sort is not set', () => {
      const searchBar = render(<SearchBar
        categories={[{ label: 'test', value: 'test' }]}
        filter=""
        handleCategory={handleCategoryMock}
        handleReset={handleResetMock}
        handleSearch={handleSearchMock}
        handleSort={handleSortMock}
        handleSortOrder={handleSortOrdeMock}
        selectedCategory=""
        selectedSort=""
        selectedSortOrder={1}
      />);
      const select = searchBar.getByLabelText('Sort order');
      expect(select).toBeDisabled();
    });
    it('should trigger handleSortOrder event on change', async () => {
      const searchBar = render(<SearchBar
        categories={[{ label: 'test', value: 'test' }]}
        filter=""
        handleCategory={handleCategoryMock}
        handleReset={handleResetMock}
        handleSearch={handleSearchMock}
        handleSort={handleSortMock}
        handleSortOrder={handleSortOrdeMock}
        selectedCategory=""
        selectedSort="name"
        selectedSortOrder={1}
      />);
      const select = searchBar.getByLabelText('Sort order');
      await user.selectOptions(select, 'Ascending');
      expect(handleSortOrdeMock).toHaveBeenCalledWith(-1);
    });
  });

  describe('Reset button', () => {
    it('should trigger handleReset event on click', () => {
      const searchBar = render(<SearchBar
        categories={[{ label: 'test', value: 'test' }]}
        filter=""
        handleCategory={handleCategoryMock}
        handleReset={handleResetMock}
        handleSearch={handleSearchMock}
        handleSort={handleSortMock}
        handleSortOrder={handleSortOrdeMock}
        selectedCategory=""
        selectedSort=""
        selectedSortOrder={1}
      />);
      const reset = searchBar.getByRole('button', { name: 'Reset' });
      reset.click();
      expect(handleResetMock).toHaveBeenCalled();
    });
  });
});
