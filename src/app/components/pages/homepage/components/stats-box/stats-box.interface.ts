import { MatchDetailResponseI } from "app/riot_api/model/match.interface";
import { statI } from "./stat.interface";

export interface statsBoxI {
  league: string;
  division: string;
  leagueUrl: string;
  totalMatches : MatchDetailResponseI[];
  matchCount : number;
  winCount : number;
  loseCount : number;
  winRate : number;
  kda : number[];
  champions : statI[];
  lanes: statI[];
}
