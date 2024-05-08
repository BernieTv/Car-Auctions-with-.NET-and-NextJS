import type { Metadata } from 'next';

import Navbar from './_nav/Navbar';
import ToasterProvider from './_providers/ToasterProvider';
import SignalRProvider from './_providers/SignalRProvider';

import './globals.css';
import { getCurrentUser } from './_actions/authActions';

export const metadata: Metadata = {
  title: 'Carsties',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ToasterProvider />
        <Navbar />

        <main className="container mx-auto px-5 pt-10">
          <SignalRProvider user={user}>{children}</SignalRProvider>
        </main>
      </body>
    </html>
  );
}