import CryptoList from "@/components/CryptoList"

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Top Cryptocurrencies</h1>
      <CryptoList />
    </div>
  )
}
