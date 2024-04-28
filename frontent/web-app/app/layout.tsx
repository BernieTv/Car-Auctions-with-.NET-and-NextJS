import './globals.css';

import type { Metadata } from 'next';

import Navbar from './_nav/Navbar';

export const metadata: Metadata = {
  title: 'Carsties',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navbar />

        <main className="container mx-auto px-5 pt-10">{children}</main>
      </body>
    </html>
  );
}
