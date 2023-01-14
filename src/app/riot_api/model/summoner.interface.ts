export interface SummonerResponse {
  id?: string;
  accountId?: string;
  puuid?: string;
  name?: string;
  profileIconId?: number;
  revisionDate?: number;
  summonerLevel?: number;
}

export interface Summoner extends SummonerResponse {
  region?: string;
  regionCode?: string;
}
