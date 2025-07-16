import { Navbar } from '@/components/Navbar';
import '../globals.css';
import type { Metadata } from 'next';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Crypto Exchange Platform',
  description: 'View, swap, and manage cryptocurrencies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="bg-gray-950 text-white flex flex-col min-h-screen">
        <Navbar/>
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-900">
            {children}
          </main>
        </div>
        <Footer />
      </div>
  );
}
