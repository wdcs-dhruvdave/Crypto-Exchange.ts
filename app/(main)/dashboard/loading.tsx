export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">📈 Loading Crypto Data...</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="h-32 bg-gray-800 animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  )
}
