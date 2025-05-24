import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Signin() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const {session,signInUser} = UserAuth()
  const Navigate = useNavigate();

  const handleSignIn = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try{
      const result = await signInUser( email, password )
      if (!email || !password) {
        setError("Email et mot de passe requis.");
        setLoading(false);
        return;
      }
      if(password.length < 6){
        setError("Le mot de passe doit comporter au moins 6 caractères.");
        setLoading(false);
        return;
      }
      if(result.success){
        Navigate('/dashboard')
      }
    }catch{
      setError('An error occurred while signing up. Please try again.')
    }finally{
      setLoading(false)
    }
  }
  return (
    <>
      {loading?(<div className="text-3xl font-bold">Loading...</div>):(<div>
        <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
          <h2 className="font-bold pb-2 text-xl">Sign in today!</h2>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-amber-500">
              Sign up!
            </Link>
          </p>
          <div className="flex flex-col py-4">
            <input
              className="p-3 mt-6 border border-gray-600 rounded"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-3 mt-6 border border-gray-600 rounded"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              className=" cursor-pointer mt-6 py-2 border border-blue-400 text-white bg-blue-400 hover:bg-blue-500 rounded">
              Sign in
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </form>
      </div>)}
    </>
  );
}
