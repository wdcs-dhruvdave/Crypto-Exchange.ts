'use client'

import { useEffect, useState } from 'react'
import { fetchCryptoAssets } from '@/lib/cryptoapi'
import { CryptoAsset } from '@/types/crypto'
import { formatNumber } from '@/lib/utils'
import SwapModal from './SwapModal'

const PER_PAGE = 10
const PAGE_WINDOW_SIZE = 10

export default function CryptoTable() {
  const [cryptoList, setCryptoList] = useState<CryptoAsset[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<'price' | 'change' | 'cap' | ''>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(100) 
  const [pageWindowStart, setPageWindowStart] = useState(1)
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null)


  useEffect(() => {
    fetchData()
  }, [page])

  async function fetchData() {
    setLoading(true)
    try {
      const data = await fetchCryptoAssets(page, PER_PAGE)
      setCryptoList(data)
      setLoading(false)
    } catch (err) {
      console.error('❌ Failed to fetch crypto assets:', err)
      setLoading(false)
    }
  }

  const filtered = cryptoList.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0
    const valA =
      sortField === 'price'
        ? a.metrics.market_data.price_usd
        : sortField === 'change'
        ? a.metrics.market_data.percent_change_usd_last_24_hours
        : a.metrics?.marketcap?.current_marketcap_usd ?? 0

    const valB =
      sortField === 'price'? b.metrics.market_data.price_usd
        : sortField === 'change'
        ? b.metrics.market_data.percent_change_usd_last_24_hours
        : b.metrics?.marketcap?.current_marketcap_usd ?? 0

    return sortOrder === 'asc' ? valA - valB : valB - valA
  })

  const pageButtons = Array.from(
    { length: PAGE_WINDOW_SIZE },
    (_, i) => pageWindowStart + i
  ).filter((p) => p <= totalPages)

  function toggleSort(field: typeof sortField) {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search assets..."
          className="w-full md:w-72 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 placeholder:text-gray-400"
        />
      </div>

        {selectedAsset && (
        <SwapModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm bg-gray-900 text-white">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="text-left px-4 py-2">Asset</th>
              <th className="text-left px-4 py-2 cursor-pointer" onClick={() => toggleSort('price')}>
                Price {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-left px-4 py-2 cursor-pointer" onClick={() => toggleSort('change')}>
                24h % {sortField === 'change' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-left px-4 py-2 cursor-pointer" onClick={() => toggleSort('cap')}>
                Market Cap {sortField === 'cap' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-right px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
            Array.from({ length: 10 }).map((_, idx) => (
              <tr key={idx} className="animate-pulse border-b border-gray-800">
                <td className="px-4 py-3">
                  <div className="h-4 w-24 bg-gray-700 rounded mb-1"></div>
                  <div className="h-3 w-12 bg-gray-700 rounded"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-20 bg-gray-700 rounded"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-16 bg-gray-700 rounded"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-24 bg-gray-700 rounded"></div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="h-8 w-16 bg-gray-700 rounded"></div>
                </td>
              </tr>
            ))
          ) : sorted.length === 0 ? (

              <tr><td colSpan={5} className="text-center py-10 text-gray-400">Loading...</td></tr>
            ) : sorted.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-10 text-gray-400">No assets found.</td></tr>
            ) : (
              sorted.map((asset) => (
                <tr key={asset.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                  <td className="px-4 py-3">
                    <span className="font-semibold">{asset.name}</span>
                    <div className="text-xs text-gray-400">{asset.symbol}</div>
                  </td>
                  <td className="px-4 py-3">${asset.metrics.market_data.price_usd.toFixed(2)}</td>
                  <td className={`px-4 py-3 ${asset.metrics.market_data.percent_change_usd_last_24_hours >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {asset.metrics.market_data.percent_change_usd_last_24_hours?.toFixed(2) || 0 }%
                  </td>
                  <td className="px-4 py-3">${formatNumber(asset.metrics?.marketcap?.current_marketcap_usd ?? 0)}</td>
                  <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setSelectedAsset(asset)}
                    className="border border-yellow-500 px-3 py-1 rounded hover:bg-yellow-500 hover:text-black transition"
                  >
                    Swap
                  </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex flex-wrap justify-between items-center px-4 py-4 bg-gray-800 text-sm text-gray-300">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="disabled:opacity-50 px-3 py-1"
          >
            Previous
          </button>

          <div className="flex gap-1 flex-wrap">
            {pageButtons.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-2 py-1 rounded ${
                  page === p
                    ? 'bg-yellow-500 text-black'
                    : 'hover:bg-gray-700 text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="disabled:opacity-50 px-3 py-1"
          >
            Next
          </button>

          {pageWindowStart > 1 && (
            <button
              onClick={() => setPageWindowStart((prev) => Math.max(prev - PAGE_WINDOW_SIZE, 1))}
              className="ml-4 text-yellow-400 hover:underline"
            >
              Show Less
            </button>
          )}

          {pageWindowStart + PAGE_WINDOW_SIZE <= totalPages && (
            <button
              onClick={() =>
                setPageWindowStart((prev) =>
                  prev + PAGE_WINDOW_SIZE <= totalPages ? prev + PAGE_WINDOW_SIZE : prev
                )
              }
              className="ml-4 text-yellow-400 hover:underline"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
