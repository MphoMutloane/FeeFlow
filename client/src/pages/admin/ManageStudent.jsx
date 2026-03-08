import React from 'react'
import { useParams } from 'react-router-dom'
import StudentForm from '../../components/admin/StudentForm'

// A page that shows the StudentForm. Used for both creating new students and 
// editing existing ones (determined by URL).
const ManageStudent = () => {
  const { id } = useParams() // Get ID from URL if exists
  
  // If id exists → we're editing
  // If no id → we're adding new
  const isEditing = !!id

  return (
    <StudentForm 
      studentId={id} 
      isEditing={isEditing} 
    />
  )
}

export default ManageStudent