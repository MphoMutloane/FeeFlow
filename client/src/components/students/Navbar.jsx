import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

// Simple navigation bar with logo/title on left, and buttons on right: "Admin" link, "Sign In", "Sign Up". 
// When logged in, shows student name instead.

const Navbar = () => {
  return (
    <div className='flex justify-between px-2 sm:px-0 md:px-6 lg:px-12 border-b border-gray-300 py-0'>
      <img src={assets.logo} alt="Logo" className='w-30 lg:w-32 cursor-pointer' />
      <div className='hidden md:flex items-center gap-12 text-gray-800'>
        <div>
          <Link to='/admin-dashboard' className='text-gray-700 hover:text-purple-700 transition font-medium mr-8'>Admin Portal</Link>
        </div>
        {/* Once the user is signed in both buttons will be removed and the user profile and name will show */}
        <Link to='/auth' className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full transition shadow-sm hover:shadow-md'>Create Account</Link>
        <Link to='/auth' className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full transition shadow-sm hover:shadow-md'>Login</Link>
      </div>
      <div></div>
    </div>
  )
}

export default Navbar