'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaDollarSign, FaHeadset, FaBars, FaTimes } from 'react-icons/fa'

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

    const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  return (
    <main className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
    <header className="fixed top-0 left-0 w-full bg-gray-950 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-500">
          CryptoXchange
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          <Link href="#features" className="hover:text-blue-400 transition">
            Features
          </Link>
          {user ? (
            <Link href="/dashboard" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white text-sm font-semibold">
              Go to Dashboard
            </Link>
          ) : (
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm font-semibold">
              Get Started
            </Link>
          )}
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 px-6 py-4 space-y-4">
          <Link href="#features" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">
            Features
          </Link>
          {user ? (
            <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white text-center">
              Go to Dashboard
            </Link>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} className="block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-center">
              Get Started
            </Link>
          )}
        </div>
      )}
    </header>

      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-36 px-4"
      >
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Trade. Swap. Grow.
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-300">
          The most trusted crypto exchange platform. Buy and sell Bitcoin, Ethereum, and other digital assets securely.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition"
          >
            Get Started
          </Link>
          <Link
            href="#features"
            className="border border-gray-400 hover:border-white text-white px-6 py-3 rounded-lg text-lg transition"
          >
            Learn More
          </Link>
        </div>
      </motion.section>

      <section id="features" className="py-20 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12"
          >
            Why Choose Us?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-gray-800 rounded-lg p-6 shadow hover:shadow-xl transition"
              >
                <feature.icon className="text-4xl text-blue-400 mx-auto mb-4 hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center py-20 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <h2 className="text-4xl font-bold mb-4">Start Trading Today</h2>
        <p className="mb-8 text-white text-lg">Join thousands of users on our secure, fast, and user-friendly platform.</p>
        <Link
          href="/dashboard"
          className="bg-white text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition"
        >
          Go to Dashboard
        </Link>
      </motion.section>

      <footer className="py-6 text-center text-gray-500 text-sm bg-gray-950 border-t border-gray-800">
        © 2025 CryptoX. All rights reserved.
      </footer>
    </main>
  )
}

const features = [
  {
    icon: FaShieldAlt,
    title: 'Secure Transactions',
    desc: 'End-to-end encryption and multi-layered security ensure your funds are always protected.',
  },
  {
    icon: FaDollarSign,
    title: 'Low Fees',
    desc: 'Enjoy the lowest trading fees in the market. More value with every trade.',
  },
  {
    icon: FaHeadset,
    title: '24/7 Support',
    desc: 'Our dedicated support team is available around the clock to help you.',
  },
]
