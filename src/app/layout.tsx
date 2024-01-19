import type { Metadata } from 'next';
import { inter } from './font';

import './globals.scss';


export const metadata: Metadata = {
  title: 'Job wiever demo',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
