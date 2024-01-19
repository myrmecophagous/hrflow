import React from 'react';
import type { Preview } from '@storybook/react';

import { inter } from '../src/app/font';
import '../src/app/globals.scss';


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={inter.className}>
        <Story />
      </div>
    ),
  ]
};

export default preview;
