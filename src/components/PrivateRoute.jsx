import React from 'react'
import { UserAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
  const { session } = UserAuth();

  // Affiche un loader tant que la session n'est pas déterminée
  if (session === undefined) {
    return <div className='text-2xl font-bold'>Chargement...</div>;
  }

  return session ? <>{children}</> : <Navigate to='/signup' />;
}
