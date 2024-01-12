import type { Meta, StoryObj } from '@storybook/react';

import Pagination from './Pagination';

const meta = {
  title: 'HrFlow.ai/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Middle: Story = {
  args: {
    current: 5,
    length: 10,
    onClick: (page: number) => console.log(page),
  },
  parameters: {
    docs: {
      description: {
        story: `Maximum 5 pages are displayed at a time.
        Pages greater than or less than 2 from the current page are hidden.`,
      },
    },
  },
};

export const First: Story = {
  args: {
    current: 1,
    length: 10,
    onClick: (page: number) => console.log(page),
  },
  parameters: {
    docs: {
      description: {
        story: 'At least 5 pages are displayed at a time.',
      },
    },
  },
};

export const Second: Story = {
  args: {
    current: 2,
    length: 10,
    onClick: (page: number) => console.log(page),
  },
  parameters: {
    docs: {
      description: {
        story: 'With the second page active, the first page button is still displayed.',
      },
    },
  },
};

export const Third: Story = {
  args: {
    current: 3,
    length: 10,
    onClick: (page: number) => console.log(page),
  },
  parameters: {
    docs: {
      description: {
        story: 'With the third page active, the first page button is still displayed.',
      },
    },
  },
};


export const Fourth: Story = {
  args: {
    current: 4,
    length: 10,
    onClick: (page: number) => console.log(page),
  },
  parameters: {
    docs: {
      description: {
        story: 'With the fourth page active, the first page button is not displayed.',
      },
    },
  },
};


export const FourthToLast: Story = {
  args: {
    current: 7,
    length: 10,
    onClick: (page: number) => console.log(page),
  },
  parameters: {
    docs: {
      description: {
        story: 'With the second to last page active, the last page button is not displayed.',
      },
    },
  },
};

export const ThirdToLast: Story = {
  args: {
    current: 8,
    length: 10,
    onClick: (page: number) => console.log(page),
  },
  parameters: {
    docs: {
      description: {
        story: 'With the second to last page active, the last page button is still displayed.',
      },
    },
  },
};

export const SecondToLast: Story = {
  args: {
    current: 9,
    length: 10,
    onClick: (page: number) => console.log(page),
  },
  parameters: {
    docs: {
      description: {
        story: 'With the second to last page active, the last page button is still displayed.',
      },
    },
  },
};

export const Last: Story = {
  args: {
    current: 10,
    length: 10,
    onClick: (page: number) => console.log(page),
  },
  parameters: {
    docs: {
      description: {
        story: `Previous (First) and Next (Last) buttons are not clickable
        if first or last page is displayed, respectively.`,
      },
    },
  },
};

export const LargeNumbers: Story = {
  args: {
    current: 101,
    length: 1000,
    onClick: (page: number) => console.log(page),
  },
  parameters: {
    docs: {
      description: {
        story: 'Large numbers should fit beautifully in the pagination.',
      },
    },
  },
};

export const CustomSpan: Story = {
  args: {
    current: 5,
    length: 10,
    onClick: (page: number) => console.log(page),
    span: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Displayed pages can be adjusted.',
      },
    },
  },
};
