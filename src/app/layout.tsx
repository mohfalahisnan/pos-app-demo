import { Toaster } from '@/components/ui/toaster';
import { EdgeStoreProvider } from '@/lib/edgestore';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// eslint-disable-next-line import/order
import { Lato } from 'next/font/google';

import './globals.css';
import { NextAuthProvider } from './next-auth';
import QueryProvider from './query-provider';

const lato = Lato({
  weight: ['100', '300', '400', '700'],
  variable: '--font-lato',
  subsets: ['latin']
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <QueryProvider>
        <EdgeStoreProvider>
          <html lang="en">
            <body className={`${lato.className} ${lato.variable}`}>
              {children} <Toaster />
            </body>
          </html>
        </EdgeStoreProvider>
      </QueryProvider>
    </NextAuthProvider>
  );
}
