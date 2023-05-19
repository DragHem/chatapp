import './globals.css';
import { Inter } from 'next/font/google';

import React from 'react';
import ToasterContext from '@/app/context/ToasterContext';
import NextAuthProvider from '@/app/context/SessionContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Chat App',
  description: 'Chat app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ToasterContext />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
