import React, { useState } from "react";
import { UserCircle, Search } from "lucide-react";

interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
}

interface PlayerListProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
  selectedPlayerId?: number;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onSelectPlayer, selectedPlayerId }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.number.toString().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow p-4 max-h-64 overflow-scroll">
      <h3 className="text-lg font-semibold mb-4">Players</h3>
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name or number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        {filteredPlayers.map((player) => (
          <button
            key={player.id}
            onClick={() => onSelectPlayer(player)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedPlayerId === player.id ? "bg-blue-100 border-blue-500" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <UserCircle className="w-8 h-8 text-gray-600" />
              <div>
                <p className="font-medium">{player.name}</p>
                <p className="text-sm text-gray-600">#{player.number} • {player.position}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
