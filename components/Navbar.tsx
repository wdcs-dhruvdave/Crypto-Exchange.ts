'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

export function Navbar() {
  const [user, setUser] = useState<{ name: string; role?: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  const logout = () => {
    localStorage.clear()
    setUser(null)
    toast.success('Logged out successfully!')
    router.push('/login')
  }

  return (
    <>
      <Toaster position="top-center" />
      <nav className="w-full bg-gray-950 text-white px-6 py-4 border-b border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-yellow-400">
            CryptoXchange
          </Link>

          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/assets" className="hover:text-yellow-400 transition">Market</Link>
            {/* <Link href="/swap" className="hover:text-yellow-400 transition">Swap</Link> */}

            {user && (
              <>
                <Link href="/wallet" className="hover:text-yellow-400 transition">Wallet</Link>
                <Link href="/transactions" className="hover:text-yellow-400 transition">Transactions</Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm hidden sm:inline">
                  👋 <span className="font-semibold">{user.name}</span>
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white text-sm font-semibold transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm font-semibold transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="border border-blue-600 hover:bg-blue-600 px-4 py-2 rounded text-blue-400 hover:text-white text-sm font-semibold transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
