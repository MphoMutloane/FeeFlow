import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/react'
import { AppContext } from '../../context/AppContext'

// Simple navigation bar with logo/title on left, and buttons on right: "Admin" link, "Sign In", "Sign Up". 
// When logged in, shows student name instead.

const Navbar = () => {

  const { openSignIn, openSignUp } = useClerk();
  const { user } = useUser();
  const { navigate, isAdmin } = useContext(AppContext);

  // Get the user's first name or full name
  const getDisplayName = () => {
    if (!user) return '';
    
    // Try to get first name from various possible sources
    const firstName = user.firstName || 
                     user.givenName || 
                     (user.fullName && user.fullName.split(' ')[0]) ||
                     user.username ||
                     'User';
    
    return firstName;
  }

  return (
    <div className='flex justify-between px-2 sm:px-0 md:px-6 lg:px-12 border-b border-gray-300 py-3'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className='w-30 lg:w-32 cursor-pointer' />

      {/* Desktop View */}
      <div className='hidden md:flex items-center gap-6 text-gray-800'>
        {user && (
          <div className='flex items-center gap-4'>
            {/* Welcome message with user name */}
            <div className='flex items-center gap-1'>
              <span className='text-gray-600'>Welcome,</span>
              <span className='font-semibold text-purple-700'>{getDisplayName()}!</span>
            </div>
            
            {/* Admin Portal Link - only show if user is admin */}
            {isAdmin && (
              <Link to='/admin-dashboard' className='text-gray-700 hover:text-purple-700 transition font-medium'>
                Admin Portal
              </Link>
            )}
          </div>
        )}

        {/* Auth Buttons */}
        {!user ? (
          <div className='flex items-center gap-3'>
            <button 
              onClick={() => openSignIn()} 
              className='border border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-2 rounded-full transition'
            >
              Sign In
            </button>
            <button 
              onClick={() => openSignUp()} 
              className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition shadow-sm hover:shadow-md'
            >
              Create Account
            </button>
          </div>
        ) : (
          <div className='flex items-center'>
            <UserButton afterSignOutUrl='/' />
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className='md:hidden flex items-center gap-3 text-gray-500'>
        {user ? (
          <>
            {/* Mobile welcome message */}
            <div className='flex items-center gap-1 text-sm'>
              <span className='text-gray-600'>Hi,</span>
              <span className='font-semibold text-purple-700'>{getDisplayName()}!</span>
            </div>
            
            {/* Mobile Admin link - only if admin */}
            {isAdmin && (
              <Link to='/admin-dashboard' className='text-xs text-purple-600 hover:text-purple-700 transition font-medium'>
                Admin
              </Link>
            )}
            
            <UserButton afterSignOutUrl='/' />
          </>
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="Sign In" className='w-8 lg:w-10 cursor-pointer' />
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar