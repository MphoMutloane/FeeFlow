import React from 'react'
import FeeSummary from '../../components/students/FeeSummary'
import TransactionList from '../../components/students/TransactionList'

// Protected page that shows: FeeSummary component at top, "Make Payment" button (opens Stripe),
// TransactionList component below and Only visible when student is approved.

const Dashboard = () => {
  // In a real app, you would check if student is approved from context/state
  const isApproved = true // This would come from your auth/student context

  const handleMakePayment = () => {
    // This would integrate with Stripe payment gateway
    console.log('Opening Stripe payment modal...')
    // window.location.href = '/payment' or open modal
  }

  if (!isApproved) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <svg className="w-20 h-20 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Pending Approval</h2>
          <p className="text-gray-600 mb-4">
            Your account is currently being verified by the admin. This usually takes 24-48 hours.
            You'll get access to the dashboard once approved.
          </p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-700">
              Need help? Contact support at <span className="font-semibold">support@feeflow.com</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your fee summary and transaction history.</p>
        </div>

        {/* Fee Summary and Payment Button Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Fee Summary - takes 2/3 of the space on medium screens and up */}
          <div className="md:col-span-2">
            <FeeSummary />
          </div>
          
          {/* Payment Button Card - takes 1/3 of the space */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Make a Payment</h3>
            <p className="text-sm text-gray-500 mb-4">
              Pay your fees securely using our Stripe payment gateway
            </p>
            <button
              onClick={handleMakePayment}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Make Payment</span>
            </button>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Student ID</p>
            <p className="text-lg font-semibold text-gray-800">STU2024001</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Program</p>
            <p className="text-lg font-semibold text-gray-800">BSc Computer Science</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Year of Study</p>
            <p className="text-lg font-semibold text-gray-800">2nd Year</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Last Payment</p>
            <p className="text-lg font-semibold text-gray-800">15 Mar 2024</p>
          </div>
        </div>

        {/* Transaction List */}
        <TransactionList />

        {/* Additional Information */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Need help?</span> If you have any questions about your fees or need assistance with payments, please contact the finance office at finance@feeflow.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard