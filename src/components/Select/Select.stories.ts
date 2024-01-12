import type { Meta, StoryObj } from '@storybook/react';

import Select, { SelectOption } from './Select';


const meta = {
  title: 'HrFlow.ai/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Choose a planet',
    onChange: (v) => console.log(v),
    options: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].map(valToOptions),
    selected: 'Mars',
  },
};

export const NoValueSelected: Story = {
  args: {
    options: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].map(valToOptions),
    label: 'Choose a planet',
    onChange: (v) => console.log(v),
    selected: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Selected value is optional. In this case, nothing is displayed by default',
      },
    },
  },
};

export const EmptyOptions: Story = {
  args: {
    options: [],
    label: 'Do not chose anything',
    onChange: (v) => console.log(v),
    selected: 'Whatever',
  }
};

export const Placeholder: Story = {
  args: {
    options: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].map(valToOptions),
    label: '',
    onChange: (v) => console.log(v),
    selected: '',
    placeholder: 'Choose a planet',
  },
  parameters: {
    docs: {
      description: {
        story: 'A placeholder can be displayed along with or instead of a label',
      },
    },
  },
};

function valToOptions(val: string | number) {
  return {
    value: val,
    label: val.toString()
  } as SelectOption;
}
