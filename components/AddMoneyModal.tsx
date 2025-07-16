'use client'

import { useState } from 'react'
import { updateWalletBalance } from '@/lib/walletapi';

export default function AddMoneyModal({ walletId, onClose }: { walletId: string; onClose: () => void }) {
  const [amount, setAmount] = useState('')

  const handleAddMoney = async () => {
    const num = parseFloat(amount)
    if (!num || num <= 0) return

    await updateWalletBalance(walletId, num)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg space-y-4 w-96 border border-gray-700">
        <h2 className="text-xl font-semibold">Add Money</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in USD"
          className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded"
        />
        <button
          onClick={handleAddMoney}
          className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded"
        >
          Add Money
        </button>
        <button onClick={onClose} className="text-sm text-gray-400 mt-2 hover:underline">Cancel</button>
      </div>
    </div>
  )
}
