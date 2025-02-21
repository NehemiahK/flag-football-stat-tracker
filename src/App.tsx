import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { supabase } from "./lib/supabaseClient";
import TeamSelection from "./pages/TeamSelection";
import TeamPage from "./pages/TeamPage";
import GamePage from "./pages/GamePage";
import SimpleLogin from "./components/SimpleLogin";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error("Error fetching user:", error.message);
      setUser(data.user);
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  return user ? element : <Navigate to="/login" />;
};

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error("Error fetching user:", error.message);
      setUser(data.user);
    }
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Football Stats Tracker
        </h1>

        <Routes>
          <Route path="/" element={<TeamSelection />} />
          <Route path="/team/:teamId" element={<TeamPage />} />
          <Route
            path="/team/:teamId/game/:gameId"
            element={<ProtectedRoute element={<GamePage />} />}
          />
          <Route path="/login" element={<SimpleLogin onLogin={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
