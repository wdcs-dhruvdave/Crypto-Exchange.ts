const Transactions = [
    {
        id: 1,
        type: 'Buy',
        amount: 100,
        date: '2023-01-01',
        status: 'Completed',
        crypto: 'Bitcoin',
        price: 10000,
    },
    {
        id: 2,
        type: 'Sell',
        amount: 50,
        date: '2023-01-02',
        status: 'Completed',
        crypto: 'Ethereum',
        price: 2000,
    },
    {
        id: 3,
        type: 'Buy',
        amount: 200,
        date: '2023-01-03',
        status: 'Completed',
        crypto: 'Bitcoin',
        price: 10000,
    },
    {
        id: 4,
        type: 'Sell',
        amount: 100,
        date: '2023-01-04',
        status: 'Completed',
        crypto: 'Ethereum',
        price: 2000,
    },
]

export default function TransactionPage() {
    return(
        <>
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-white">Transactions</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 text-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-700 text-left">ID</th>
                            <th className="px-6 py-3 border-b border-gray-700 text-left">Type</th>
                            <th className="px-6 py-3 border-b border-gray-700 text-left">Amount</th>
                            <th className="px-6 py-3 border-b border-gray-700 text-left">Date</th>
                            <th className="px-6 py-3 border-b border-gray-700 text-left">Status</th>
                            <th className="px-6 py-3 border-b border-gray-700 text-left">Crypto</th>
                            <th className="px-6 py-3 border-b border-gray-700 text-left">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Transactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-700 transition">
                                <td className="px-6 py-4 border-b border-gray-700">{transaction.id}</td>
                                <td className="px-6 py-4 border-b border-gray-700">{transaction.type}</td>
                                <td className="px-6 py-4 border-b border-gray-700">{transaction.amount}</td>
                                <td className="px-6 py-4 border-b border-gray-700">{transaction.date}</td>
                                <td className="px-6 py-4 border-b border-gray-700">{transaction.status}</td>
                                <td className="px-6 py-4 border-b border-gray-700">{transaction.crypto}</td>
                                <td className="px-6 py-4 border-b border-gray-700">${transaction.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
