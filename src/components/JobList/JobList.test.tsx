import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import JobList from './JobList';
import type { Job } from './JobList';


const jobs: Job[] = [
  {name: '1', id: 1, created_at: ''},
  {name: '2', id: 2, created_at: ''},
  {name: '3', id: 3, created_at: ''},
  {name: '4', id: 4, created_at: ''},
  {name: '5', id: 5, created_at: ''},
];
const categories = ['category1', 'category2'];

describe('JobList', () => {

  describe('SearchBar', () => {
    describe('Search input', () => {
      it('should retrieve values from localStorage', () => {
        localStorage.clear();
        const expected = 'test';
        localStorage.setItem('filter', `"${expected}"`);
        const jobList = render(<JobList jobs={jobs} categories={categories} />);
        const searchInput = jobList.getByLabelText('Search') as HTMLInputElement;
        expect(searchInput.value).toBe(expected);
      });
      it('should save value in localStorage', () => {
        localStorage.clear();
        const jobList = render(<JobList jobs={jobs} categories={categories} />);
        const searchInput = jobList.getByLabelText('Search');
        const expected = 'test';
        fireEvent.input(searchInput, { target: { value: expected } });
        const stored = localStorage.getItem('filter');
        expect(stored).toBe(`"${expected}"`);
      });
    });

    describe('Category select', () => {
      it('should retrieve values from localStorage', () => {
        localStorage.clear();
        const expected = 'category1';
        localStorage.setItem('category', `"${expected}"`);
        const jobList = render(<JobList jobs={jobs} categories={categories} />);
        const categorySelect = jobList.getByLabelText('Category') as HTMLSelectElement;
        expect(categorySelect.value).toBe(expected);
      });
      it('should save value in localStorage', () => {
        localStorage.clear();
        const jobList = render(<JobList jobs={jobs} categories={categories} />);
        const categorySelect = jobList.getByLabelText('Category') as HTMLSelectElement;
        const expected = 'category1';
        fireEvent.change(categorySelect, { target: { value: expected } });
        const stored = localStorage.getItem('category');
        expect(stored).toBe(`"${expected}"`);
      });
    });

    describe('Sort select', () => {
      it('should retrieve values from localStorage', () => {
        localStorage.clear();
        const expected = 'name';
        localStorage.setItem('sort', `"${expected}"`);
        const jobList = render(<JobList jobs={jobs} categories={categories} />);
        const sortSelect = jobList.getByLabelText('Sort by') as HTMLSelectElement;
        expect(sortSelect.value).toBe(expected);
      });
      it('should save value in localStorage', () => {
        localStorage.clear();
        const jobList = render(<JobList jobs={jobs} categories={categories} />);
        const sortSelect = jobList.getByLabelText('Sort by') as HTMLSelectElement;
        const expected = 'name';
        fireEvent.change(sortSelect, { target: { value: expected } });
        const stored = localStorage.getItem('sort');
        expect(stored).toBe(`"${expected}"`);
      });
    });

    describe('Sort Order select', () => {
      it('should be disabled when Sort is not set', () => {
        localStorage.clear();
        const jobList = render(<JobList jobs={jobs} categories={categories} />);
        const sortOrderSelect = jobList.getByLabelText('Sort order') as HTMLSelectElement;
        expect(sortOrderSelect).toBeDisabled();
      });
      it('should retrieve values from localStorage', () => {
        localStorage.clear();
        const expected = '-1';
        localStorage.setItem('sortOrder', `"${expected}"`);
        const jobList = render(<JobList jobs={jobs} categories={categories} />);
        const sortOrderSelect = jobList.getByLabelText('Sort order') as HTMLSelectElement;
        expect(sortOrderSelect.value).toBe(expected);
      });
      it('should save value in localStorage', () => {
        localStorage.clear();
        const jobList = render(<JobList jobs={jobs} categories={categories} />);
        const sortOrderSelect = jobList.getByLabelText('Sort order') as HTMLSelectElement;
        const expected = '-1';
        fireEvent.change(sortOrderSelect, { target: { value: expected } });
        const stored = localStorage.getItem('sortOrder');
        expect(stored).toBe(expected);
      });
    });

    describe('Reset button', () => {
      it('should reset all values', () => {
        localStorage.setItem('sortOrder', '"-1"');
        localStorage.setItem('sort', '"name"');
        localStorage.setItem('category', '"category1"');
        localStorage.setItem('filter', '"test"');
        const jobList = render(<JobList jobs={jobs} categories={categories} />);
        const filterInput = jobList.getByLabelText('Search') as HTMLInputElement;
        const categorySelect = jobList.getByLabelText('Category') as HTMLSelectElement;
        const sortSelect = jobList.getByLabelText('Sort by') as HTMLSelectElement;
        const sortOrderSelect = jobList.getByLabelText('Sort order') as HTMLSelectElement;
        const resetButton = jobList.getByRole('button', {name: 'Reset'});
        fireEvent.click(resetButton);
        expect(filterInput.value).toBe('');
        expect(categorySelect.value).toBe('');
        expect(sortSelect.value).toBe('');
        expect(sortOrderSelect.value).toBe('1');
      });
      it('should reset all values in localStorage', () => {
        localStorage.setItem('sortOrder', '"-1"');
        localStorage.setItem('sort', '"name"');
        localStorage.setItem('category', '"category1"');
        localStorage.setItem('filter', '"test"');
        const jobList = render(<JobList jobs={jobs} categories={categories} />);
        const resetButton = jobList.getByRole('button', {name: 'Reset'});
        fireEvent.click(resetButton);
        expect(localStorage.getItem('sortOrder')).toBeNull();
        expect(localStorage.getItem('sort')).toBeNull();
        expect(localStorage.getItem('category')).toBeNull();
        expect(localStorage.getItem('filter')).toBeNull();
      });
    });

    xit('should sort jobs by category in ascending order', () => {});
    xit('should sort jobs by category in descending order', () => {});
    xit('should NOT sort jobs if customSort is enabled', () => {});
  });

  describe('Pagination', () => {
    it('should be rendered if there are more than 10 jobs', () => {
      const jobs: Job[] = [
        {name: '1', id: 1, created_at: ''},
        {name: '2', id: 2, created_at: ''},
        {name: '3', id: 3, created_at: ''},
        {name: '4', id: 4, created_at: ''},
        {name: '5', id: 5, created_at: ''},
        {name: '6', id: 6, created_at: ''},
        {name: '7', id: 7, created_at: ''},
        {name: '8', id: 8, created_at: ''},
        {name: '9', id: 9, created_at: ''},
        {name: '10', id: 10, created_at: ''},
        {name: '11', id: 11, created_at: ''},
      ];
      const jobList = render(<JobList jobs={jobs} categories={categories} />);
      const pagination = jobList.getByRole('navigation');
      expect(pagination).toBeInTheDocument();
    });
    it('should NOT be rendered if there are less than 10 jobs', () => {
      const jobList = render(<JobList jobs={jobs} categories={categories} />);
      const pagination = jobList.queryByRole('navigation');
      expect(pagination).not.toBeInTheDocument();
    });
    xit('should save selected page in localStorage', () => {});
  });

  xdescribe('JobList', () => {
    it('should reorder jobs when moving cards with drag and drop', () => {});
  });
  xdescribe('JobCard', () => {
    it('should open modal when clicked', () => {});
  });
});
