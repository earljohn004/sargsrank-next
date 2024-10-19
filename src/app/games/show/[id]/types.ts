export interface PlayerInformation {
  first_name: string;
  last_name: string;
}

export interface GamePlayers {
  player_id: number;
  player_information: PlayerInformation;
}

export interface GameScores {
  player_id: number;
  score: number;
  status: string;
}

export interface ShowGame {
  game_id: string;
  game_mode: string;
  game_race: number;
  game_players: GamePlayers[];
  game_scores: GameScores[];
}
