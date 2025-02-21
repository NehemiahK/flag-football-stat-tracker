import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Game } from '../types';

const TeamPage = () => {
  const { teamId } = useParams();
  const [teamName, setTeamName] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTeamData() {
      setLoading(true);
      const { data: teamData, error: teamError } = await supabase
        .from('Teams')
        .select('name')
        .eq('id', teamId)
        .single();
      
      if (teamError) {
        console.error('Error fetching team:', teamError);
      } else {
        setTeamName(teamData.name);
      }

      const { data: gamesData, error: gamesError } = await supabase
        .from('games')
        .select('*')
        .or(`team_1_id.eq.${teamId},team_2_id.eq.${teamId}`);
      
      if (gamesError) {
        console.error('Error fetching games:', gamesError);
      } else {
        setGames(gamesData);
      }

      setLoading(false);
    }

    fetchTeamData();
  }, [teamId]);

  return (
    <div className="max-w-4xl mx-auto">
      {loading ? (
        <p className="text-center">Loading team data...</p>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center mb-6">{teamName}</h2>
          <h3 className="text-xl font-semibold mb-4">Games</h3>
          <ul className="bg-white shadow rounded-lg p-4">
            {games.map((game) => (
              <li key={game.id} className="border-b last:border-none py-2">
                <Link to={`/team/${teamId}/game/${game.id}`} className="text-blue-500 hover:underline">
                  Week {game.week} - {new Date(game.date).toDateString()}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TeamPage;
