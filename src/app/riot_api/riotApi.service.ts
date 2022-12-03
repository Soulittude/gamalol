import { Injectable } from '@angular/core';
import { SummonerResponse, Summoner, ChampionMasteryResponse, MatchesResponse, MatchDetailResponse } from './riotaApi.interface';

@Injectable({
  providedIn: 'root',
})
export class RiotApiService {
  apikey= 'RGAPI-beb4acc1-c9d9-4c10-b3c2-f7eee48468ec';

  async getSummoner(summonerName: string, summonerServer: string) {
    const url = `https://${summonerServer}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${this.apikey}`;

    try {
      const response = await fetch(url);
      const summonerResponse = await response.json() as SummonerResponse;
      return {
        ...summonerResponse,
        regionCode: summonerServer,
        region: this.regionCodeToRegionName(summonerServer),
      } as Summoner;
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

  async getMatches(summoner: Summoner) {
    const url = `https://${summoner.region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=20&api_key=${this.apikey}`;

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
