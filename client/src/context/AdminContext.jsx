import React, { createContext, useState, useEffect } from "react";

// Manages all student data and functions: fetchStudents, addStudent, 
// updateStudent, deleteStudent. Makes these available to all admin components.

export const AdminContext = createContext()

export const AdminContextProvider = ({ children }) => {
    // Manual student data for now - will be replaced with API calls
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Initialize with manual data
    useEffect(() => {
        // Simulating initial data load
        setStudents([
            { 
                id: '1', 
                studentNumber: 'S0012345', 
                name: 'John Doe', 
                email: 'john.doe@university.ac.za',
                course: 'BSc Computer Science', 
                year: 2,
                fees: 45000,
                paidAmount: 22500,
                status: 'approved',
                registrationDate: '2024-01-15'
            },
            { 
                id: '2', 
                studentNumber: 'S0012346', 
                name: 'Jane Smith', 
                email: 'jane.smith@university.ac.za',
                course: 'BCom Accounting', 
                year: 3,
                fees: 42000,
                paidAmount: 38000,
                status: 'approved',
                registrationDate: '2024-01-16'
            },
            { 
                id: '3', 
                studentNumber: 'S0012347', 
                name: 'Peter Jones', 
                email: 'peter.jones@university.ac.za',
                course: 'BEng Mechanical', 
                year: 1,
                fees: 48000,
                paidAmount: 12000,
                status: 'pending',
                registrationDate: '2024-02-01'
            },
            { 
                id: '4', 
                studentNumber: 'S0012348', 
                name: 'Sarah Wilson', 
                email: 'sarah.wilson@university.ac.za',
                course: 'BA Psychology', 
                year: 2,
                fees: 38000,
                paidAmount: 38000,
                status: 'approved',
                registrationDate: '2024-01-20'
            },
            { 
                id: '5', 
                studentNumber: 'S0012349', 
                name: 'Mike Brown', 
                email: 'mike.brown@university.ac.za',
                course: 'BSc Information Technology', 
                year: 3,
                fees: 44000,
                paidAmount: 30000,
                status: 'approved',
                registrationDate: '2024-01-18'
            },
        ])
    }, [])

    // Fetch all students (simulated - will be API call)
    const fetchStudents = async () => {
        setLoading(true)
        try {
            // Simulate API call
            // const response = await axios.get('/api/admin/students')
            // setStudents(response.data)
            console.log('Fetching students...')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Add new student
    const addStudent = async (studentData) => {
        setLoading(true)
        try {
            // Simulate API call
            // const response = await axios.post('/api/admin/students', studentData)
            const newStudent = {
                ...studentData,
                id: Date.now().toString(), // Temporary ID generation
                paidAmount: 0,
                status: 'pending',
                registrationDate: new Date().toISOString().split('T')[0]
            }
            setStudents(prev => [...prev, newStudent])
            return { success: true, data: newStudent }
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        } finally {
            setLoading(false)
        }
    }

    // Update existing student
    const updateStudent = async (id, updatedData) => {
        setLoading(true)
        try {
            // Simulate API call
            // const response = await axios.put(`/api/admin/students/${id}`, updatedData)
            setStudents(prev => 
                prev.map(student => 
                    student.id === id ? { ...student, ...updatedData } : student
                )
            )
            return { success: true }
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        } finally {
            setLoading(false)
        }
    }

    // Delete student
    const deleteStudent = async (id) => {
        setLoading(true)
        try {
            // Simulate API call
            // const response = await axios.delete(`/api/admin/students/${id}`)
            setStudents(prev => prev.filter(student => student.id !== id))
            return { success: true }
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        } finally {
            setLoading(false)
        }
    }

    // Get single student by ID
    const getStudentById = (id) => {
        return students.find(student => student.id === id)
    }

    // Get students by status
    const getStudentsByStatus = (status) => {
        return students.filter(student => student.status === status)
    }

    // Get total fees collected
    const getTotalFeesCollected = () => {
        return students.reduce((total, student) => total + student.paidAmount, 0)
    }

    // Get total outstanding fees
    const getTotalOutstandingFees = () => {
        return students.reduce((total, student) => total + (student.fees - student.paidAmount), 0)
    }

    const value = {
        students,
        loading,
        error,
        fetchStudents,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudentById,
        getStudentsByStatus,
        getTotalFeesCollected,
        getTotalOutstandingFees
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}