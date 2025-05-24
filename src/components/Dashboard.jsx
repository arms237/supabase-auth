import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const {session, signOut} = UserAuth()
  const Navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    if(session && !session.user.email_confirmed_at){
      Navigate('/signup');
    }
  },[session, Navigate])

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");
      if (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);
  
  const handleSignOut = async (e)=>{
    e.preventDefault();
    try{
      await signOut();
      Navigate('/');
    }catch(error){
      console.error("Error signing out: ", error);
    }
  }
  if (loading) return <div className='text-2xl font-bold'>Loading...</div>;

  return (
    <div>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <h2 className='text-xl text-green-400'>Welcome, {session?.user?.user_metadata.username}</h2>
      <div>
        <p className='cursor-pointer hover:text-blue-500' onClick={handleSignOut}>Sign out</p>
      </div>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  )
}
