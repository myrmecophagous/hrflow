import React from 'react';

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
  decorators: [
    (Story) => (
      <div style={{ width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Story />
      </div>
    ),
  ],
  args: {
    length: 3,
  },
};
