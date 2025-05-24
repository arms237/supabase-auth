import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
export default function Navbar() {
  const { session } = UserAuth();

  return (
    <nav className='flex items-center justify-between bg-gray-100 p-4'>
        <Link to='/' className='text-2xl font-bold italic'>SupabaseAuthApp</Link>
        <ul className='flex gap-x-4 justify-center items-center'>
            <li>
            <a href="/" className='text-blue-500 hover:text-blue-700'>Home</a>
            </li>
            <li>
            <a href="/signin" className='text-blue-500 hover:text-blue-700'>Sign In</a>
            </li>
            <li>
            <a href="/signup" className='text-blue-500 hover:text-blue-700'>Sign Up</a>
            </li>
            {session && <li>
            <a href="/dashboard" className='text-blue-500 hover:text-blue-700'>Dashboard</a>
            </li>}
        </ul>
    </nav>
  )
}
