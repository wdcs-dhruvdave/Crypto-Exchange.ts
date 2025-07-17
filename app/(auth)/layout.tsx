import { Navbar } from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'


export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-950 text-white items-center justify-center">
        {/* <Toaster position="top-right" /> */}
        <Navbar></Navbar>
      {children}
    </div>
  )
}
