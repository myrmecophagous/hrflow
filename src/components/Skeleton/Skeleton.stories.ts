import type { Meta, StoryObj } from '@storybook/react';

import Skeleton from './Skeleton';

const meta = {
  title: 'HrFlow.ai/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    length: 3,
  },
};
