import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const {session,signUpNewUser} = UserAuth()
  const Navigate = useNavigate();

  const handleSignUp = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try{
      const result = await signUpNewUser({ email, password })
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
  console.log(email,password,session);
  return (
    <>
      {loading?(<div className="text-3xl font-bold">Loading...</div>):(<div>
        <form onSubmit={handleSignUp} className="max-w-md m-auto pt-24">
          <h2 className="font-bold pb-2">Sign up today!</h2>
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="text-amber-500">
              Sign in!
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
              Sign up
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </form>
      </div>)}
    </>
  );
}
