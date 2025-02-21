export interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
}

export interface Team {
  id: string;
  name: string;
}

export interface GameStats {
  id: string;
  playerId: string;
  gameId: string;
  touchdowns: number;
  passAttempts: number;
  passCompletions: number;
  receptions: number;
  interceptions: number;
  pick6: number;
  pbu: number;
  flags: number;
  sacks: number;
}

export interface Game {
  id: string;
  week: number;
  date: string;
  team_1: string;
  team_2: string;
}

export interface PlayerStats {
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
