import type { Meta, StoryObj } from '@storybook/react';

import JobList from './JobList';
import type { Job } from './JobList';


const meta = {
  title: 'HrFlow.ai/JobList',
  component: JobList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof JobList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    jobs: [{
      id: 1,
      key: '1',
      name: 'Your ad could go here',
      tags: [
        {
          name: 'category',
          value: 'Marketing'
        },
      ],
      created_at: '2023-06-12T17:24:18+0000',
    },
    {
      id: 2,
      key: '2',
      name: '...or here',
      tags: [
        {
          name: 'category',
          value: 'More Marketing'
        },
      ],
      created_at: '2023-06-12T17:24:18+0000',
    }],
    categories: [],
  },
};

export const NoJobsFound: Story = {
  args: {
    jobs: [],
    categories: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'This situation arises on a server error.',
      },
    },
  },
};

const dummyArray = {
  filter: () => [],
  length: 1,
};

export const NoJobSatisfiesCriteria: Story = {
  args: {
    jobs: dummyArray as unknown as Job[],
    categories: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'This situation arises on a server error.',
      },
    },
  },
};
