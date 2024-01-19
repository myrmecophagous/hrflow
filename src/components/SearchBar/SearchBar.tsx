'use client';

import Select, { SelectOption } from '@/components/Select/Select';
import styles from './SearchBar.module.scss';


interface SearchBarProps {
  categories: SelectOption[];
  filter: string;
  handleCategory: (value: string) => void;
  handleReset: () => void;
  handleSearch: (value: string) => void;
  handleSort: (value: string) => void;
  handleSortOrder: (value: number) => void;
  selectedCategory: string,
  selectedSort: string,
  selectedSortOrder: number,
};

export default function SearchBar({
  categories,
  filter,
  handleCategory,
  handleReset,
  handleSearch,
  handleSort,
  handleSortOrder,
  selectedCategory,
  selectedSort,
  selectedSortOrder,
}: SearchBarProps) {

  const sortOrders: SelectOption[] = [
    { label: 'Ascending', value: -1 },
    { label: 'Descending', value: 1 },
  ];
  const sorts: SelectOption[] = [
    { label: 'Date', value: 'created_at' },
    { label: 'Name', value: 'name' },
    { label: 'Category', value: 'category' },
  ];

  return (<div className={styles.search_bar}>
    <div className={styles.input_container}>
      <label>
        <div>Search</div>
        <input type="text" onChange={(e) => handleSearch(e.target.value)} className={styles.input} autoComplete="off" value={filter} />
      </label>
    </div>
    <Select
      label="Category"
      onChange={(e) => handleCategory(e.target.value)}
      options={categories}
      selected={selectedCategory}
    />
    <Select
      label="Sort by"
      onChange={(e) => handleSort(e.target.value)}
      options={sorts}
      selected={selectedSort}
    />
    <Select
      label="Sort order"
      onChange={(e) => handleSortOrder(Number(e.target.value))}
      options={sortOrders}
      selected={selectedSortOrder}
      disabled={!selectedSort}
    />
    <button onClick={handleReset} className={styles.button}>Reset</button>
  </div>);
}
