import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';


const meta = {
  title: 'HrFlow.ai/Header',
  component: Header,
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
