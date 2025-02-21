import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const SimpleLogin = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
    } else {
      onLogin(data.user);
      navigate("/");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold text-center mb-4">Login / Sign Up</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full p-2 border rounded mb-2"
      />
      <button onClick={handleLogin} className="w-full bg-green-600 text-white p-2 rounded">
        Log In
      </button>
    </div>
  );
};

export default SimpleLogin;
