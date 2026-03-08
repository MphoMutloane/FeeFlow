import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

// Simple table showing fee transactions with columns: Date, Description, Amount, Status (Paid/Pending).
const TransactionList = () => {
  const { currency } = useContext(AppContext)
  
  // Sample transaction data - in a real app, this would come from an API or context
  const transactions = [
    { id: 1, date: '2024-03-15', description: 'Tuition Fee - Semester 1', amount: 15000, status: 'Paid' },
    { id: 2, date: '2024-03-10', description: 'Registration Fee', amount: 1200, status: 'Paid' },
    { id: 3, date: '2024-02-28', description: 'Library Fee', amount: 500, status: 'Paid' },
    { id: 4, date: '2024-02-15', description: 'Sports Complex Fee', amount: 800, status: 'Pending' },
    { id: 5, date: '2024-02-01', description: 'Accommodation Deposit', amount: 5000, status: 'Paid' },
  ]

  const getStatusBadge = (status) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium'
    if (status === 'Paid') {
      return <span className={`${baseClasses} bg-green-100 text-green-800`}>Paid</span>
    }
    return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending</span>
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-ZA', options)
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-purple-900">Transaction History</h2>
        <p className="text-sm text-gray-500 mt-1">Your recent fee transactions</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(transaction.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {currency}{transaction.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(transaction.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {transactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No transactions found</p>
        </div>
      )}
    </div>
  )
}

export default TransactionList