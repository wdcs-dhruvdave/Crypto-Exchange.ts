'use client'
import { useEffect, useState } from 'react'
import { fetchCryptoAssets } from '@/lib/cryptoapi'
import { CryptoAsset } from '@/types/crypto'

const PER_PAGE = 10

export default function CryptoTable() {
  const [allAssets, setAllAssets] = useState<CryptoAsset[]>([])
  const [filteredAssets, setFilteredAssets] = useState<CryptoAsset[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<'price' | 'change' | 'cap' | ''>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCryptoAssets(1, 100).then((data) => {
      setAllAssets(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    handleSearchAndSort()
  }, [allAssets, searchTerm, sortField, sortOrder])

  function handleSearchAndSort() {
    let temp = [...allAssets]

    // Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      temp = temp.filter(
        (a) =>
          a.name.toLowerCase().includes(term) ||
          a.symbol.toLowerCase().includes(term)
      )
    }

    // Sort
    if (sortField) {
      temp.sort((a, b) => {
        const valA =
          sortField === 'price'
            ? a.metrics.market_data.price_usd
            : sortField === 'change'
            ? a.metrics.market_data.percent_change_usd_last_24_hours
            : a.market_cap?.market_cap_usd ?? 0

        const valB =
          sortField === 'price'
            ? b.metrics.market_data.price_usd
            : sortField === 'change'
            ? b.metrics.market_data.percent_change_usd_last_24_hours
            : b.market_cap?.market_cap_usd ?? 0

        return sortOrder === 'asc' ? valA - valB : valB - valA
      })
    }

    setFilteredAssets(temp)
    setPage(1) // Reset to first page when search/sort changes
  }

  function toggleSort(field: typeof sortField) {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const totalPages = Math.ceil(filteredAssets.length / PER_PAGE)
  const paginated = filteredAssets.slice((page - 1) * PER_PAGE, page * PER_PAGE)

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

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm bg-gray-900 text-white">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="text-left px-4 py-2">Asset</th>
              <th
                className="text-left px-4 py-2 cursor-pointer"
                onClick={() => toggleSort('price')}
              >
                Price {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="text-left px-4 py-2 cursor-pointer"
                onClick={() => toggleSort('change')}
              >
                24h % {sortField === 'change' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="text-left px-4 py-2 cursor-pointer"
                onClick={() => toggleSort('cap')}
              >
                Market Cap {sortField === 'cap' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-right px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  No assets found.
                </td>
              </tr>
            ) : (
              paginated.map((asset) => (
                <tr key={asset.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                  <td className="px-4 py-3">
                    <div>
                      <span className="font-semibold">{asset.name}</span>
                      <div className="text-xs text-gray-400">{asset.symbol}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    ${asset.metrics.market_data.price_usd.toFixed(2)}
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      asset.metrics.market_data.percent_change_usd_last_24_hours >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {asset.metrics.market_data.percent_change_usd_last_24_hours.toFixed(2)}%
                  </td>
                  <td className="px-4 py-3">
                    ${formatMarketCap(asset.market_cap?.market_cap_usd ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="border border-yellow-500 px-3 py-1 rounded hover:bg-yellow-500 hover:text-black transition">
                      Swap
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-4 py-3 bg-gray-800 text-sm text-gray-300">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="disabled:opacity-50"
          >
            Previous
          </button>
          <div className="flex gap-1 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
            className="disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

function formatMarketCap(value: number) {
  if (value >= 1e12) return (value / 1e12).toFixed(1) + 'T'
  if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B'
  if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M'
  return value.toFixed(2)
}
