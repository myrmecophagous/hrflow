import type { Meta, StoryObj } from '@storybook/react';

import Footer from './Footer';


const meta = {
  title: 'HrFlow.ai/Footer',
  component: Footer,
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
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
