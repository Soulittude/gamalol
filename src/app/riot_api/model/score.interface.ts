export interface ScoreDto {
  champName: string;
  sumName: string;
  kill: number;
  death: number;
  assist: number;
  farm: number;
  lane: string;
  win: number;
  matchId: string;
  spells: string[];
  items: string[];
  runes: string[];
}

export interface Score {
  id: number;
  champName: string;
  sumName: string;
  kill: number;
  death: number;
  assist: number;
  farm: number;
  gold: number;
  lane: string;
  win: number;
  matchId: string;
  spells: string[];
  items: string[];
  runes: string[];
}

export interface ChampTable {
  champName: string;
  kill: number;
  death: number;
  assist: number;
  farm: number;
  gold: number,
  matchCount: number;
  pickRate: number,
  winCount: number;
  winRate: number;
}
