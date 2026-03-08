import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import StudentsTable from '../../components/admin/StudentsTable'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

// The main admin page. Displays the StudentsTable component and 
// an "Add New Student" button that links to the ManageStudent page.
const AdminDashboard = () => {
  const navigate = useNavigate()
  const { currency } = useContext(AppContext)
  const { getTotalFeesCollected, getTotalOutstandingFees, students } = useContext(AdminContext)

  const handleAddStudent = () => {
    navigate('/manage-student')
  }

  // Calculate dashboard stats
  const totalStudents = students.length
  const approvedStudents = students.filter(s => s.status === 'approved').length
  const pendingStudents = students.filter(s => s.status === 'pending').length
  const totalCollected = getTotalFeesCollected()
  const totalOutstanding = getTotalOutstandingFees()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-purple-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage students and monitor fee collections</p>
          </div>
          
          <button
            onClick={handleAddStudent}
            className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add New Student</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Students */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-purple-900">{totalStudents}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+{approvedStudents}</span>
              <span className="text-gray-500 ml-2">approved</span>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending Approvals</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingStudents}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Awaiting verification</p>
            </div>
          </div>

          {/* Total Collected */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Collected</p>
                <p className="text-3xl font-bold text-green-600">{currency}{totalCollected.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">From {approvedStudents} approved students</p>
            </div>
          </div>

          {/* Outstanding Balance */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Outstanding</p>
                <p className="text-3xl font-bold text-red-600">{currency}{totalOutstanding.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">To be collected</p>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <StudentsTable />

       
      </div>
    </div>
  )
}

export default AdminDashboard