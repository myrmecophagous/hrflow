import type { Meta, StoryObj } from '@storybook/react';

import SearchBar from './SearchBar';


const meta = {
  title: 'HrFlow.ai/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories: [],
    filter: '',
    handleCategory: (value: string) => {},
    handleReset: () => {},
    handleSearch: (value: string) => {},
    handleSort: (value: string) => {},
    handleSortOrder: (value: number) => {},
    selectedCategory: '',
    selectedSort: '',
    selectedSortOrder: 1,
  },
};

export const SortOrderEnabled: Story = {
  args: {
    categories: [],
    filter: '',
    handleCategory: (value: string) => {},
    handleReset: () => {},
    handleSearch: (value: string) => {},
    handleSort: (value: string) => {},
    handleSortOrder: (value: number) => {},
    selectedCategory: '',
    selectedSort: 'title',
    selectedSortOrder: -1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sort order is only enabled when a sort condition is selected.',
      },
    },
  },
};
