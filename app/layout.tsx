import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Crypto Exchange - Home',
  description: 'Landing page for Crypto Exchange Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white flex flex-col min-h-screen">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
