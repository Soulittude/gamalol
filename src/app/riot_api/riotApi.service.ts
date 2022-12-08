import { Injectable } from '@angular/core';
import { leagueI } from './league.interface';
import { SummonerResponse, Summoner, ChampionMasteryResponse, MatchesResponse, MatchDetailResponse } from './riotaApi.interface';

@Injectable({
  providedIn: 'root',
})
export class RiotApiService {
  apikey= 'RGAPI-d4a0c4e9-89e0-42a7-b032-191bfdef1a4b';

  async getSummoner(summonerName: string, summonerServer: string) {
    const url = `http://localhost:4200/summoner/${summonerServer}/${summonerName}`;

    try {
      const response = await fetch(url);
      const summonerResponse = await response.json() as Summoner;
      return summonerResponse
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getLeagues(summoner: Summoner) {
    const url = `https://${summoner.regionCode}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${this.apikey}`;

    try {
      const response = await fetch(url);
      const leaguesResponse = await response.json() as leagueI[];
      return leaguesResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getMastery(summoner: Summoner) {
    const url = `https://${summoner.regionCode}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner.id}?api_key=${this.apikey}`;

    try {
      const response = await fetch(url);
      const masteryResponse = await response.json() as ChampionMasteryResponse;
      return masteryResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getMatches(summoner: Summoner, macMin: number, macMax: number, queueId: string) {
    var url = "asd";
    if(queueId == "77777")
    {
      url = `https://${summoner.region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=${macMin}&count=${macMax}&api_key=${this.apikey}`;
    }
    else
    {
      url = `https://${summoner.region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?queue=${queueId}&start=${macMin}&count=${macMax}&api_key=${this.apikey}`;
    }
    try {
      const response = await fetch(url);
      const matchesResponse = await response.json() as MatchesResponse;
      return matchesResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getMatchDetail(summoner: Summoner, matchId : string) {
    const url = `https://${summoner.region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.apikey}`;
    try {
      const response = await fetch(url);
      const matchDetailResponse = await response.json() as MatchDetailResponse; //******************************************* */
      return matchDetailResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getActiveMatch(summoner: Summoner) {
    const url = `https://${summoner.regionCode}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner.id}?api_key=${this.apikey}`;

    try {
      const response = await fetch(url);
      const activeMatchResponse = await response.json(); //******************************************* */
      return activeMatchResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  regionCodeToRegionName(regionCode: string) {
    // startwith check
    if (regionCode.startsWith('euw')) {
      return 'europe';
    }
    if (regionCode.startsWith('na')) {
      return 'americas';
    }
    if (regionCode.startsWith('br')) {
      return 'americas';
    }
    if (regionCode.startsWith('kr')) {
      return 'asia';
    }
    if (regionCode.startsWith('jp')) {
      return 'asia';
    }
    if (regionCode.startsWith('la')) {
      return 'americas';
    }
    if (regionCode.startsWith('oc')) {
      return 'sea';
    }
    if (regionCode.startsWith('tr')) {
      return 'europe';
    }
    if (regionCode.startsWith('ru')) {
      return 'europe';
    }
    return 'unknown';
  }
}
