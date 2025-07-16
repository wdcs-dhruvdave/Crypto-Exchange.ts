'use client'

import { useEffect, useState } from 'react'
import { CryptoAsset } from '@/types/crypto'
import { fetchCryptoAssets } from '@/lib/cryptoapi'
import Select from 'react-select'

export default function SwapModal({
  asset,
  onClose,
}: {
  asset: CryptoAsset
  onClose: () => void
}) {
  const [cryptoList, setCryptoList] = useState<CryptoAsset[]>([])
  const [fromToken, setFromToken] = useState(asset.symbol)
  const [toToken, setToToken] = useState('')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [rate, setRate] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAssets()
  }, [])

  useEffect(() => {
    updateRate()
  }, [fromToken, toToken, cryptoList])

  const fetchAssets = async () => {
    try {
      const assets = await fetchCryptoAssets(1, 50)
      setCryptoList(assets)
      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch assets:', err)
      setLoading(false)
    }
  }

  const updateRate = () => {
    const from = cryptoList.find((a) => a.symbol === fromToken)
    const to = cryptoList.find((a) => a.symbol === toToken)
    if (from && to) {
      const rateValue =
        from.metrics.market_data.price_usd / to.metrics.market_data.price_usd
      setRate(rateValue)
      if (fromAmount) {
        setToAmount((+fromAmount * rateValue).toFixed(6))
      }
    }
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    setToAmount((+value * rate).toFixed(6))
  }

  const selectOptions = cryptoList.map((asset) => ({
    label: `${asset.symbol} - ${asset.name}`,
    value: asset.symbol,
  }))

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e293b] text-white w-[455px] rounded-xl shadow-xl p-6 space-y-6 border border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Crypto Swap</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-sm">✕</button>
        </div>
        <p className="text-sm text-gray-400">Select assets to swap. Rates are updated in real-time.</p>

        {loading ? (
          <div className="space-y-6">
            <div className="h-5 w-full bg-gray-700 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-700 rounded animate-pulse" />
            <div className="h-5 w-full bg-gray-700 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-700 rounded animate-pulse" />
          </div>
        ) : (
          <>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">From</label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
                <div className="min-w-[150px]">
                <Select
                classNames={{
                    control: () => 'bg-gray-800 border border-gray-700 text-sm',
                }}
                options={selectOptions}
                value={selectOptions.find((opt) => opt.value === fromToken)}
                onChange={(selected) => setFromToken(selected?.value || '')}
                isSearchable
                placeholder="Select"
                styles={{
                    control: (base) => ({
                    ...base,
                    backgroundColor: '#1e293b',
                    borderColor: '#374151',
                    color: 'white',
                    }),
                    singleValue: (base) => ({
                    ...base,
                    color: 'white', 
                    }),
                    input: (base) => ({
                    ...base,
                    color: 'white', 
                    }),
                    menu: (base) => ({
                    ...base,
                    backgroundColor: '#1e293b',
                    color: 'white',
                    }),
                    option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#374151' : '#1e293b',
                    color: 'white',
                    }),
                }}
                />

                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">Balance: 0.000000 {fromToken}</p>
            </div>

            <div className="text-center text-xl text-gray-400">↓</div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">To</label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={toAmount}
                  readOnly
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
                <div className="min-w-[150px]">
                  <Select
                    options={selectOptions}
                    value={selectOptions.find((opt) => opt.value === toToken)}
                    onChange={(selected) => setToToken(selected?.value || '')}
                    isSearchable
                    placeholder="Select"
                    styles={{
                        control: (base) => ({
                        ...base,
                        backgroundColor: '#1e293b',
                        borderColor: '#374151',
                        color: 'white',
                        }),
                        singleValue: (base) => ({
                        ...base,
                        color: 'white', 
                        }),
                        input: (base) => ({
                        ...base,
                        color: 'white', 
                        }),
                        menu: (base) => ({
                        ...base,
                        backgroundColor: '#1e293b',
                        color: 'white',
                        }),
                            option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused ? '#374151' : '#1e293b',
                            color: 'white',
                            }),
                        }}
                        />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Rate: 1 {fromToken} ≈ {rate.toFixed(6)} {toToken}
              </p>
            </div>

            <button
              className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 transition"
              onClick={() => {
                console.log(`Swapped ${fromAmount} ${fromToken} → ${toAmount} ${toToken}`)
                onClose()
              }}
            >
              Swap
            </button>
          </>
        )}
      </div>
    </div>
  )
}
