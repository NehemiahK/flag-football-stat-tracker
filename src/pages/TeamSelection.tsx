import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Team } from "../types";

const TeamSelection = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTeams() {
      setLoading(true);
      const { data, error } = await supabase.from("Teams").select("*");
      if (error) {
        console.error("Error fetching teams:", error);
      } else {
        setTeams(data);
      }
      setLoading(false);
    }

    fetchTeams();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Select a Team</h2>
      {loading ? (
        <p className="text-center">Loading teams...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {teams.map((team) => (
            <Link
              key={team.id}
              to={`/team/${team.id}`}
              className="bg-blue-500 text-white text-center py-4 rounded-lg shadow-md hover:bg-blue-700"
            >
              {team.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSelection;
