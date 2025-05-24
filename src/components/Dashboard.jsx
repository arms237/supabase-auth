import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const {session, signOut} = UserAuth()
  const Navigate = useNavigate();

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
    <div>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <h2 className='text-xl text-green-400'>Welcome, {session?.user?.user_metadata.username}</h2>
      <div>
        <p className='cursor-pointer hover:text-blue-500' onClick={handleSignOut}>Sign out</p>
      </div>
    </div>
  )
}
