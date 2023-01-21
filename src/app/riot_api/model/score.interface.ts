export interface ScoreDto {
  champName: string;
  kill: number;
  death: number;
  assist: number;
  farm: number;
  gold: number;
  spells: string[];
  items: string[];
  majorRune: string;
  minorRune: string;
  lane: string;
  win: number;
  sumName: string;
  matchId: string;
  matchDuration: number;
}

export interface Score {
  id: number;
  champName: string;
  kill: number;
  death: number;
  assist: number;
  farm: number;
  gold: number;
  spells: string[];
  items: string[];
  majorRune: string;
  minorRune: string;
  lane: string;
  win: number;
  sumName: string;
  matchId: string;
  matchDuration: number;
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
