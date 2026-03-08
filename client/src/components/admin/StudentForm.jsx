import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

// A form with input fields for: Student Number, Name, Course, and Fees Amount. 
// Used for both adding new students and editing existing ones.
const StudentForm = ({ studentId, isEditing }) => {
  const navigate = useNavigate()
  const { currency } = useContext(AppContext)
  const { addStudent, updateStudent, getStudentById } = useContext(AdminContext)
  
  const [formData, setFormData] = useState({
    studentNumber: '',
    name: '',
    email: '',
    course: '',
    year: '',
    fees: '',
    status: 'pending'
  })
  
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Load student data if editing
  useEffect(() => {
    if (isEditing && studentId) {
      const student = getStudentById(studentId)
      if (student) {
        setFormData({
          studentNumber: student.studentNumber,
          name: student.name,
          email: student.email,
          course: student.course,
          year: student.year,
          fees: student.fees,
          status: student.status
        })
      }
    }
  }, [isEditing, studentId, getStudentById])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.studentNumber.trim()) {
      newErrors.studentNumber = 'Student number is required'
    } else if (!/^S\d{7}$/.test(formData.studentNumber)) {
      newErrors.studentNumber = 'Student number must be in format S0012345'
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Student name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.course.trim()) {
      newErrors.course = 'Course is required'
    }
    
    if (!formData.year) {
      newErrors.year = 'Year of study is required'
    } else if (formData.year < 1 || formData.year > 6) {
      newErrors.year = 'Year must be between 1 and 6'
    }
    
    if (!formData.fees) {
      newErrors.fees = 'Fees amount is required'
    } else if (formData.fees < 0) {
      newErrors.fees = 'Fees cannot be negative'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setLoading(true)
    
    try {
      let result
      if (isEditing) {
        result = await updateStudent(studentId, formData)
      } else {
        result = await addStudent(formData)
      }
      
      if (result.success) {
        // Navigate back to dashboard
        navigate('/admin-dashboard')
      } else {
        setErrors({ submit: result.error })
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/admin-dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              {isEditing ? 'Edit Student' : 'Add New Student'}
            </h2>
            <p className="text-purple-200 text-sm mt-1">
              {isEditing ? 'Update student information' : 'Fill in the details to add a new student'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {errors.submit && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Student Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentNumber"
                  value={formData.studentNumber}
                  onChange={handleChange}
                  placeholder="S0012345"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.studentNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.studentNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.studentNumber}</p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@university.ac.za"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Course */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="BSc Computer Science"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.course ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.course && (
                  <p className="mt-1 text-sm text-red-600">{errors.course}</p>
                )}
              </div>

              {/* Year of Study */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Study <span className="text-red-500">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.year ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="5">5th Year</option>
                  <option value="6">6th Year</option>
                </select>
                {errors.year && (
                  <p className="mt-1 text-sm text-red-600">{errors.year}</p>
                )}
              </div>

              {/* Fees Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Fees ({currency}) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  placeholder="45000"
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.fees ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.fees && (
                  <p className="mt-1 text-sm text-red-600">{errors.fees}</p>
                )}
              </div>

              {/* Status (only for editing) */}
              {isEditing && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                <span>{loading ? 'Saving...' : (isEditing ? 'Update Student' : 'Add Student')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StudentForm