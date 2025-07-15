import axios from 'axios'
import { User } from '@/types/user'

const BASE_URL = process.env.NEXT_PUBLIC_USER_API_URL

export async function fetchUsers(): Promise<User[]> {
  try {
    const res = await axios.get<User[]>(`${BASE_URL}`)
    console.log('🟢 Raw API response:', res.data)
    return res.data
  } catch (err) {
    console.error('❌ Error fetching users:', err)
    throw new Error('Failed to fetch users')
  }
}

export async function loginUser(email: string, password: string): Promise<User | null> {
  const users = await fetchUsers()

  const normalizedEmail = email.trim().toLowerCase()
  const normalizedPassword = password.trim()

  console.log('🔍 Checking against email:', normalizedEmail)
  console.log('🔍 Checking against password:', normalizedPassword)

  const user = users.find((u) => {
    const userEmail = u.email?.trim().toLowerCase()
    const userPassword = u.password?.trim()

    console.log('🟡 Comparing with:', userEmail, '|', userPassword)

    return userEmail === normalizedEmail && userPassword === normalizedPassword
  })

  if (!user) {
    console.warn('❌ No matching user found!')
  } else {
    console.log('✅ Matching user:', user)
  }

  return user ?? null
}

export async function registerUser(name: string, email: string, password: string, role?: string): Promise<User | null> {

    const newUser = {
        name:name.trim(),
        email:email.trim().toLowerCase(),
        password:password.trim(),
        role: role ?? 'user',
        createdAt : new Date().toISOString(),
        updatedAt : new Date().toISOString()
    }

  console.log('New User Registring with :', newUser)

  try{
    const res = await axios.post(`${BASE_URL}`, newUser)
    console.log('User Registered Sucessfully:',res.data);
    return res.data as User
  }
  catch(err) {
    console.error('Error Registering User:', err)
    throw new Error('Failed to register user')
  }

}
