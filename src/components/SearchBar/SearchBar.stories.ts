import type { Meta, StoryObj } from '@storybook/react';

import SearchBar from './SearchBar';
import type { Job } from '@/components/JobList/JobList';

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
    handleSort: (value: keyof Job) => {},
    handleSortOrder: (value: number) => {},
    selectedCategory: '',
    selectedSort: '' as keyof Job,
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
    handleSort: (value: keyof Job) => {},
    handleSortOrder: (value: number) => {},
    selectedCategory: '',
    selectedSort: 'title' as keyof Job,
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
