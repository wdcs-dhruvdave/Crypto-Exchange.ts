import axios from 'axios'
import { Wallet } from '@/types/wallet'

const BASE_URL = process.env.NEXT_PUBLIC_WALLET_API_URL ?? ''
if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_WALLET_API_URL is not defined')
}

export async function fetchUserWallets(userId: string): Promise<Wallet[]> {
  try {
    const res = await axios.get<Wallet[]>(`${BASE_URL}?userId=${userId}`)
    return res.data
  } catch (error) {
    console.error('Error fetching wallets:', error)
    return []
  }
}

export async function createWallet(userId: string, token: string = 'USD', balance: number = 0): Promise<Wallet> {
  const newWallet = {
    userId,
    token,
    balance,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  try {
    const res = await axios.post<Wallet>(BASE_URL, newWallet)
    return res.data
  } catch (error) {
    console.error('❌ Failed to create wallet:', error)
    throw new Error('Wallet creation failed')
  }
}

export async function fetchUserWalletByToken(userId: string, token: string): Promise<Wallet | null> {
  try {
    const res = await axios.get<Wallet[]>(`${BASE_URL}?userId=${userId}&token=${token}`)
    return res.data[0] || null
  } catch (error) {
    console.error('Error fetching wallet by token:', error)
    return null
  }
}

export async function addMoney(walletId: string, currentBalance: number, amount: number): Promise<Wallet> {
  const updatedWallet = {
    balance: currentBalance + amount,
    updatedAt: new Date().toISOString(),
  }

  try {
    const res = await axios.put<Wallet>(`${BASE_URL}/${walletId}`, updatedWallet)
    console.log('🟢 Money added:', res.data)
    return res.data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.error('❌ Error adding money:', err.message)
    } else {
      console.error('❌ Error adding money:', err)
    }
    throw new Error('Failed to add money')
  }
}


export async function updateWalletBalance(walletId: string, newBalance: number): Promise<Wallet> {
  const res = await axios.put<Wallet>(`${BASE_URL}/${walletId}`, {
    balance: newBalance,
    updatedAt: new Date().toISOString(),
  })
  return res.data
}

export async function addToWallet(walletId: string, currentBalance: number, amount: number): Promise<Wallet> {
  const newBalance = currentBalance + amount
  return updateWalletBalance(walletId, newBalance)
}

export async function subtractFromWallet(walletId: string, currentBalance: number, amount: number): Promise<Wallet> {
  const newBalance = currentBalance - amount
  if (newBalance < 0) throw new Error('Insufficient balance')
  return updateWalletBalance(walletId, newBalance)
}
