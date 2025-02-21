import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import PlayerList from "../components/PlayerList";
import PlayerStatsForm from "../components/PlayerStatsForm";
import StatusMessage from "../components/StatusMessage";
import { Player, PlayerStats } from "../types";

const defaultStats: Omit<
  PlayerStats,
  "player_id" | "game_id" | "team_id" | "week"
> = {
  touchdowns: 0,
  pass_attempts: 0,
  pass_completions: 0,
  tds_thrown: 0,
  ints_thrown: 0,
  receptions: 0,
  interceptions: 0,
  pick6: 0,
  pbu: 0,
  flags: 0,
  sacks: 0,
};

const GamePage = () => {
  const { teamId, gameId } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerStats, setPlayerStats] = useState<
    Record<number, Partial<PlayerStats>>
  >({});
  const [week, setWeek] = useState<number | null>(null);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  useEffect(() => {
    async function fetchWeek() {
      const { data, error } = await supabase
        .from("games")
        .select("week")
        .eq("id", Number(gameId))
        .single();

      if (error) console.error("Error fetching game week:", error);
      else setWeek(data.week);
    }
    fetchWeek();
  }, [gameId]);

  useEffect(() => {
    async function fetchPlayers() {
      const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq("team_id", Number(teamId));

      if (error) console.error("Error fetching players:", error);
      else setPlayers(data);
    }
    fetchPlayers();
  }, [teamId]);

  useEffect(() => {
    async function fetchPlayerStats() {
      if (!week) return;

      const { data, error } = await supabase
        .from("player_stats")
        .select("*")
        .eq("game_id", Number(gameId))
        .eq("team_id", Number(teamId))
        .eq("week", week);

      if (error) {
        console.error("Error fetching player stats:", error);
      } else {
        const statsMap: Record<number, Partial<PlayerStats>> = {};
        data.forEach((stat) => {
          statsMap[stat.player_id] = stat;
          localStorage.setItem(
            `stats-${stat.player_id}-${gameId}`,
            JSON.stringify(stat)
          );
        });
        setPlayerStats(statsMap);
      }
    }

    if (week) {
      fetchPlayerStats();
    }
  }, [gameId, teamId, week]);

  const handleStatChange = (field: keyof PlayerStats, value: number) => {
    if (!selectedPlayer) return;

    setPlayerStats((prev) => {
      const existingStats = prev[selectedPlayer.id] || {};
      const updatedStats = {
        ...defaultStats,
        ...existingStats,
        [field]: value,
      };

      localStorage.setItem(
        `stats-${selectedPlayer.id}-${gameId}`,
        JSON.stringify(updatedStats)
      );

      return {
        ...prev,
        [selectedPlayer.id]: updatedStats,
      };
    });
  };

  const handleSaveAllStats = async () => {
    if (!week) return;

    const statsArray = Object.entries(playerStats).map(([playerId, stats]) => {
      const { id, ...statsWithoutId } = stats;

      return {
        player_id: Number(playerId),
        game_id: Number(gameId),
        team_id: Number(teamId),
        week: week,
        ...statsWithoutId, 
      };
    });

    console.log("🚀 Sending payload to Supabase:", statsArray);

    // ✅ Upsert without `id`
    const { error } = await supabase.from("player_stats").upsert(statsArray, {
      onConflict: "player_id,game_id,week", // Uses these fields to determine updates vs inserts
    });

    if (error) {
      setStatus({
        type: "error",
        message: "Failed to save stats. Try again.",
      });
      console.error("❌ Error saving stats:", error);
    } else {
      setStatus({ type: "success", message: "Stats saved successfully!" });
      setTimeout(() => setStatus({ type: null, message: "" }), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Week {week}</h2>

      {/* Status Message Component */}
      <StatusMessage type={status.type} message={status.message}/>

      <PlayerList
        players={players}
        onSelectPlayer={setSelectedPlayer}
        selectedPlayerId={selectedPlayer?.id}
      />

      {selectedPlayer && (
        <PlayerStatsForm
          playerName={selectedPlayer.name}
          stats={playerStats[selectedPlayer.id] || defaultStats}
          onChange={handleStatChange}
        />
      )}

      <button
        onClick={handleSaveAllStats}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Save All Stats
      </button>
    </div>
  );
};

export default GamePage;
