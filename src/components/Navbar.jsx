import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import profile from '../assets/profile.svg'

export default function Navbar() {
  const { session,signInUser,signOut } = UserAuth();
  const Navigate = useNavigate();

  //Deconnecte l'utilisateur
  const handleSignOut = async (e)=>{
    e.preventDefault();
    try{
      await signOut();
      Navigate('/');
    }catch(error){
      console.error("Error signing out: ", error);
    }
  }
  return (
    <nav className='flex items-center justify-between bg-gray-100 p-4'>
        <Link to='/' className='text-2xl font-bold italic'>SupabaseAuthApp</Link>
        <div className='flex items-center'>
          <ul className='flex gap-x-4 justify-center items-center'>
            <li>
            <a href="/" className='text-blue-500 hover:text-blue-700'>Home</a>
            </li>
            {!session && <><li>
            <a href="/signin" className='text-blue-500 hover:text-blue-700'>Sign In</a>
            </li>
            <li>
            <a href="/signup" className='text-blue-500 hover:text-blue-700'>Sign Up</a>
            </li></>}
            {session && <><li>
            <a href="/dashboard" className='text-blue-500 hover:text-blue-700'>Dashboard</a>
            </li>
            <li className='px-4 py-2 border border-red-500 text-white bg-red-500 hover:bg-red-600 cursor-pointer rounded' onClick={handleSignOut}>Sign Out</li>
            </>}   
          </ul>
         {session &&  <img src={profile} alt="profile image" className='w-15 h-15 rounded-full'/>}
        </div>
        
    </nav>
  )
}
