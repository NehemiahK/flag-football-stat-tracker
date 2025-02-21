import React from "react";

interface PlayerStats {
  player_id: number;
  game_id: number;
  team_id: number;
  week: number;
  touchdowns: number;
  pass_attempts: number;
  pass_completions: number;
  tds_thrown: number;
  ints_thrown: number;
  receptions: number;
  interceptions: number;
  pick6: number;
  pbu: number;
  flags: number;
  sacks: number;
}

interface PlayerStatsFormProps {
  stats: Partial<PlayerStats>;
  onChange: (field: keyof PlayerStats, value: number) => void;
  playerName: string;
}

const HIDDEN_FIELDS = ["player_id", "game_id", "team_id", "week", "id"];

const PlayerStatsForm: React.FC<PlayerStatsFormProps> = ({
  stats,
  onChange,
  playerName,
}) => {
  const numberOptions = Array.from({ length: 101 }, (_, i) => i);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-4">Player Stats - {playerName}</h3>
      <div className="grid grid-cols-3 gap-2">
        {Object.keys(stats)
          .filter((field) => !HIDDEN_FIELDS.includes(field))
          .map((field) => (
            <div key={field} className="mb-2">
              <label className="block text-xs font-medium capitalize">
                {field.replace(/_/g, " ")}
              </label>
              <select
                value={stats[field as keyof PlayerStats] ?? 0}
                onChange={(e) =>
                  onChange(field as keyof PlayerStats, parseInt(e.target.value))
                }
                className="block w-full p-1 text-xs border rounded"
              >
                {numberOptions.map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlayerStatsForm;
