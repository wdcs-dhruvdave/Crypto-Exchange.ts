import type { CryptoAsset } from '@/types/crypto'

export default function CryptoCard({ asset }: { asset: CryptoAsset }) {
  const price = asset.metrics.market_data.price_usd.toFixed(2)
  const change = asset.metrics.market_data.percent_change_usd_last_24_hours.toFixed(2)

  return (
    <div className="bg-gray-900 text-white p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{asset.name} ({asset.symbol})</h2>
      <p className="text-green-400 mt-2">${price}</p>
      <p
        className={`mt-1 ${
          parseFloat(change) >= 0 ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {change}% (24h)
      </p>
    </div>
  )
}
