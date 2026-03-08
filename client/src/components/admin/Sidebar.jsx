import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

// Simple navigation with links to Dashboard and a logout button.
const Sidebar = () => {
  const navigate = useNavigate()
  const { currency } = useContext(AppContext)

  const handleLogout = () => {
    // In a real app, this would clear auth tokens, user data, etc.
    console.log('Logging out...')
    // Redirect to landing page
    navigate('/')
  }

  const navItems = [
    { 
      path: '/admin-dashboard', 
      name: 'Students', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      path: '/manage-student', 
      name: 'Add Student', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
  ]

  return (
    <aside className="bg-gradient-to-b from-purple-800 to-purple-900 text-white w-64 min-h-screen flex flex-col shadow-2xl">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-purple-700">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <span>FeeFlow Admin</span>
        </h1>
        <p className="text-xs text-purple-300 mt-1">Manage students & fees</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200 ${
                isActive 
                  ? 'bg-purple-700 text-white shadow-lg' 
                  : 'text-purple-200 hover:bg-purple-700 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-purple-200 hover:bg-red-600 hover:text-white rounded-lg transition duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar