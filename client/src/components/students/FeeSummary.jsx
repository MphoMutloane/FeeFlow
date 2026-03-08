import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

// A clean card showing total fees owing and due date.
const FeeSummary = () => {
  const { currency } = useContext(AppContext)
  
  // Sample data - in a real app, this would come from an API or context
  const feeData = {
    totalOwing: 8500,
    dueDate: '2024-04-15',
    totalPaid: 22500,
    grandTotal: 31000,
    paymentProgress: 73 // percentage
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-ZA', options)
  }

  const getDaysUntilDue = () => {
    const today = new Date()
    const due = new Date(feeData.dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntilDue = getDaysUntilDue()

  return (
    <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-5">
        <h2 className="text-lg font-medium text-purple-100">Fee Summary</h2>
        
        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-bold text-white">
              {currency}{feeData.totalOwing.toLocaleString()}
            </p>
            <p className="text-sm text-purple-200">
              Total Owing
            </p>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-purple-200">
                Due {formatDate(feeData.dueDate)}
              </p>
            </div>
            
            {daysUntilDue <= 7 && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                daysUntilDue <= 2 ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
              }`}>
                {daysUntilDue <= 0 ? 'Overdue' : `${daysUntilDue} days left`}
              </span>
            )}
          </div>
        </div>
        
        {/* Progress bar showing payment progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-purple-200">Payment Progress</span>
            <span className="text-purple-100 font-medium">{feeData.paymentProgress}%</span>
          </div>
          <div className="w-full bg-purple-300 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${feeData.paymentProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-purple-200">Paid: {currency}{feeData.totalPaid.toLocaleString()}</span>
            <span className="text-purple-200">Total: {currency}{feeData.grandTotal.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Quick stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-purple-500 pt-4">
          <div>
            <p className="text-xs text-purple-200">Total Paid</p>
            <p className="text-lg font-semibold text-white">{currency}{feeData.totalPaid.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-purple-200">Remaining</p>
            <p className="text-lg font-semibold text-white">{currency}{feeData.totalOwing.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeeSummary