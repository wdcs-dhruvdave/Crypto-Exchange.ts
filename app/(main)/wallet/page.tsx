'use client'

import { useEffect, useState } from 'react'
import { Wallet } from '@/types/wallet'
import { fetchUserWallets, createWallet, addMoney } from '@/lib/walletapi'
import { getLoggedInUser } from '@/lib/auth'
import toast from 'react-hot-toast'

export default function WalletPage() {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [usdWallet, setUsdWallet] = useState<Wallet | null>(null)
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      const user = getLoggedInUser()
      if (!user) {
        toast.error('User not logged in')
        return
      }

      setUserId(user.id)

      try {
        const data = await fetchUserWallets(user.id)

        if (data.length === 0) {
          setLoading(false)
          return
        }

        const usd = data.find((w) => w.token === 'USD')
        setUsdWallet(usd || null)
        setWallets(data)
      } catch (err) {
        toast.error('Failed to load wallets')
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  const handleGenerateWallet = async () => {
    if (!userId) return

    try {
      const newWallet = await createWallet(userId, 'USD', 0)
      toast.success('Wallet created')
      setUsdWallet(newWallet)
      setWallets([newWallet])
    } catch (err) {
      toast.error('Failed to create wallet')
    }
  }

  const handleAddMoney = async () => {
    if (!usdWallet || !amount) return

    try {
      if(parseFloat(amount) <= 0) {
        toast.error('Amount must be greater than 0')
        return
      }
      const updated = await addMoney(usdWallet.id, usdWallet.balance, parseFloat(amount))
      toast.success(`Added ${amount} to wallet`)
      setUsdWallet(updated)
      setWallets((prev) =>
        prev.map((w) => (w.id === updated.id ? updated : w))
      )
      setAmount('')
    } catch (err) {
      toast.error('Failed to add money')
    }
  }

  if (loading) return <div className="p-4 text-white">Loading wallet...</div>

  return (
    <div className="p-4 text-white max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Wallet</h1>

      {!usdWallet && (
        <div className="space-y-4">
          <p className="text-gray-300">You don't have a wallet yet.</p>
          <button
            onClick={handleGenerateWallet}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded"
          >
            Generate Wallet
          </button>
        </div>
      )}

      {usdWallet && (
        <>
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Wallet Id : {usdWallet.id}</h2>
            </div>
          <div className="bg-gray-800 p-4 rounded border border-gray-700">
            
            <div className="text-sm text-gray-400">USD Balance</div>
            <div className="text-2xl font-semibold">${usdWallet.balance.toFixed(2)}</div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-300">Add Money</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount in USD"
                className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
              />
              <button
                onClick={handleAddMoney}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </>
      )}

      {wallets.length > 1 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Your Tokens</h2>
          {wallets
            .filter((w) => w.token !== 'USD')
            .map((w) => (
              <div key={w.id} className="bg-gray-800 p-3 rounded border border-gray-700 flex justify-between">
                <span>{w.token}</span>
                <span>{w.balance.toFixed(6)}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
