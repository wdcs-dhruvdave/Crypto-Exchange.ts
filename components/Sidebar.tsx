'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '../lib/utils'

const SidebarButton = ({
  label,
  icon,
  href,
  show = true
}: {
  label: string
  icon: string
  href: string
  show?: boolean
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  if (!show) return null

  return (
    <li>
      <Link
        href={href}
        className={cn(
          'flex items-center gap-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group',
          isActive
            ? 'bg-yellow-500 text-black shadow-md'
            : 'text-gray-300 hover:bg-gray-800 hover:text-yellow-400'
        )}
      >
        <span className="text-xl group-hover:scale-110 transition-transform duration-200">
          {icon}
        </span>
        <span>{label}</span>
      </Link>
    </li>
  )
}

export const Sidebar = () => {
  const [user, setUser] = useState<{ name: string; role?: string } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  const isLoggedIn = !!user
  const isAdmin = user?.role === 'admin'

  return (
    <aside className="w-60 hidden md:flex flex-col bg-gray-900 border-r border-gray-800 p-6 h-screen sticky top-0">
      {/* <h2 className="text-2xl font-bold text-yellow-400 mb-6">CryptoXchange</h2> */}

      <nav className="flex-1">
        <ul className="space-y-2">

          <SidebarButton label="Market" icon="📊" href="/dashboard" />
          <SidebarButton label="Wallet" icon="👛" href="/wallet" show={isLoggedIn} />
          <SidebarButton label="Swap" icon="🔁" href="/swap" show />
          <SidebarButton label="Transactions" icon="📜" href="/transactions" show={isLoggedIn} />
          <SidebarButton label="Profile" icon="👤" href="/profile" show={isLoggedIn} />

          <SidebarButton label="Admin Panel" icon="🛠️" href="/admin" show={isAdmin} />
        </ul>
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-700 text-xs text-gray-500">
        <p>&copy; 2025 CryptoXchange</p>
        <p className="text-[11px]">Secure. Scalable. Smart.</p>
      </div>
    </aside>
  )
}
