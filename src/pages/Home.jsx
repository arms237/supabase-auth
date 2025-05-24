import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-y-2 items-center justify-center mt-50">
      <h1 className="text-4xl font-bold text-center">
        Welcome to auth supabase App
      </h1>
      <Link
        to="/signup"
        className="mt-2 px-4 py-2 border border-blue-400 text-white bg-blue-400 hover:bg-blue-500 rounded"
      >
        Se connecter{" "}
      </Link>
    </div>
  );
}
