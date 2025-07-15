'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { loginUser } from '@/lib/api'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

type LoginForm = {
  email: string
  password: string
}


export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')


  useEffect(()=>{
    const user = localStorage.getItem('user')

    if (user) {
      router.push('/dashboard')
      toast.error('You are already logged in, Logout first !')
    }

  },[])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    setError('')
    try {
      const user = await loginUser(data.email, data.password)

      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        toast.success('Welcome back!')
        router.push('/dashboard')
      } else {
        toast.error('Invalid credentials')
      }
    } catch (err) {
      setError('Login failed')
      toast.error('Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 to-black px-4">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="backdrop-blur-md bg-white/5 border border-gray-700 text-white p-8 rounded-2xl w-full max-w-md shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">🔐 Sign In</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-sm text-center mt-5 text-gray-400">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-400 hover:underline">
            Register now
          </a>
        </p>
      </motion.form>
    </div>
  )
}
