import type { Meta, StoryObj } from '@storybook/react';

import Card from './Card';


const meta = {
  title: 'HrFlow.ai/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  args: {
    id: 1346749,
    key: '1346749',
    name: 'Human Resources Manager',
    tags: [
      {name: 'category', value: 'Human Resources'},
    ],
    created_at: '2023-06-12T17:24:18+0000',
    onClick: () => {},
  },
};

export const VeryLongTitle: Story = {
  args: {
    id: 1346749,
    key: '1346749',
    name: `The Most Talanted Human Resources Manager The World Ever Seen
    In The History Of The World For The Last 100 Years And Even More`,
    tags: [
      {name: 'category', value: 'Human Resources'},
    ],
    created_at: '2023-06-12T17:24:18+0000',
    onClick: () => {},
  },
};
