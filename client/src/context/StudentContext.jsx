import React, { createContext, useState, useEffect } from "react";

// Manages student data: fetch fees, get current balance, check approval status. 
// Makes data available to dashboard components.

export const StudentContext = createContext()

export const StudentContextProvider = ({ children }) => {
    const [studentData, setStudentData] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Manual student data for now
    useEffect(() => {
        // Simulate logged-in student data
        setStudentData({
            id: '1',
            studentNumber: 'S0012345',
            name: 'John Doe',
            email: 'john.doe@university.ac.za',
            course: 'BSc Computer Science',
            year: 2,
            fees: 45000,
            paidAmount: 22500,
            status: 'approved',
            dueDate: '2024-04-15'
        })

        setTransactions([
            { id: 1, date: '2024-03-15', description: 'Tuition Fee - Semester 1', amount: 15000, status: 'Paid' },
            { id: 2, date: '2024-03-10', description: 'Registration Fee', amount: 1200, status: 'Paid' },
            { id: 3, date: '2024-02-28', description: 'Library Fee', amount: 500, status: 'Paid' },
            { id: 4, date: '2024-02-15', description: 'Sports Complex Fee', amount: 800, status: 'Pending' },
            { id: 5, date: '2024-02-01', description: 'Accommodation Deposit', amount: 5000, status: 'Paid' },
        ])
    }, [])

    // Fetch student fees
    const fetchStudentFees = async (studentId) => {
        setLoading(true)
        try {
            // Simulate API call
            // const response = await axios.get(`/api/students/${studentId}/fees`)
            return studentData
        } catch (err) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    // Get current balance
    const getCurrentBalance = () => {
        if (!studentData) return 0
        return studentData.fees - studentData.paidAmount
    }

    // Check approval status
    const isApproved = () => {
        return studentData?.status === 'approved'
    }

    // Get payment progress percentage
    const getPaymentProgress = () => {
        if (!studentData) return 0
        return Math.round((studentData.paidAmount / studentData.fees) * 100)
    }

    // Fetch transaction history
    const fetchTransactions = async (studentId) => {
        setLoading(true)
        try {
            // Simulate API call
            // const response = await axios.get(`/api/students/${studentId}/transactions`)
            return transactions
        } catch (err) {
            setError(err.message)
            return []
        } finally {
            setLoading(false)
        }
    }

    const value = {
        studentData,
        transactions,
        loading,
        error,
        fetchStudentFees,
        getCurrentBalance,
        isApproved,
        getPaymentProgress,
        fetchTransactions
    }

    return (
        <StudentContext.Provider value={value}>
            {children}
        </StudentContext.Provider>
    )
}