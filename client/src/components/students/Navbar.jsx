import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/react'

// Simple navigation bar with logo/title on left, and buttons on right: "Admin" link, "Sign In", "Sign Up". 
// When logged in, shows student name instead.

const Navbar = () => {

  const { openSignIn } = useClerk();
  const { user } = useUser();


  return (
    <div className='flex justify-between px-2 sm:px-0 md:px-6 lg:px-12 border-b border-gray-300 py-0'>
      <Link to='/'> <img src={assets.logo} alt="Logo" className='w-30 lg:w-32 cursor-pointer' /></Link>

      <div className='hidden md:flex items-center gap-12 text-gray-800'>
        <div>
          {user && <>

            <Link to='/admin-dashboard' className='text-gray-700 hover:text-purple-700 transition font-medium mr-8'>Admin Portal</Link>
          </>
          }


        </div>
        {/* Once the user is signed in both buttons will be removed and the user profile will show */}
        {user ? <UserButton /> : <button onClick={() => openSignIn()} className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full transition shadow-sm hover:shadow-md'>Create Account</button>}
      </div>

      {/* Adjustability for phone screens */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>{user && <>

          <Link to='/admin-dashboard' className='text-gray-700 hover:text-purple-700 transition font-medium mr-8'>Admin Portal</Link>
        </>
        }</div>
        <div>
          {
            user ? <UserButton /> : <button onClick={() => openSignIn()}><img src={assets.user_icon} alt="" className='w-8 lg:w-10 cursor-pointer' /></button>
          }

        </div>
      </div>
    </div>
  )
}

export default Navbar