'use client'

import { useForm } from 'react-hook-form'
import { registerUser } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

type FormData = {
  name: string
  email: string
  password: string
}

export default function RegisterPage() {
  const router = useRouter()

  useEffect(()=>{
    const user = localStorage.getItem('user')

    if (user) {
      router.push('/dashboard')
      toast.error('You are already logged in, Logout first !')
    }

  },[])



  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const user = await registerUser(data.name, data.email, data.password)
      if (user) {
        toast.success('Registration successful! Redirecting to login...')
        setTimeout(() => router.push('/login'), 1500)
      }
    } catch (err) {
      toast.error('Registration failed. Try a different email.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto mt-20 p-6 bg-gray-900 text-white rounded-2xl shadow-lg"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            {...register('name', { required: true })}
            className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register('email', { required: true })}
            className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none"
            placeholder="Enter your email"
            type="email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            {...register('password', { required: true, minLength: 6 })}
            className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none"
            placeholder="Create a password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-400">
        Already have an account?{' '}
        <a href="/login" className="text-blue-400 hover:underline">
          Login here
        </a>
      </p>
    </motion.div>
  )
}
