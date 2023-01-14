import { Injectable } from '@angular/core';
import { LeagueI } from './model/league.interface';
import { ActiveMatchI } from './model/activematch.interface';
import { ChampionI } from './model/champion.interface';
import { Summoner } from './model/summoner.interface';
import { MatchDetailResponseI } from './model/match.interface';
import { MatchesResponseI } from './model/matches.interface';
import { Score } from './model/score.interface';

@Injectable({
  providedIn: 'root',
})
export class RiotApiService {
  apiUrl = 'https://loljs.onrender.com/api/';

  async getSummoner(summonerName: string, summonerServer: string) {
    const url = this.apiUrl + `summoner/${summonerServer}/${summonerName}`;
    console.log(url);

    try {
      const response = await fetch(url);
      const summonerResponse = await response.json() as Summoner;
      return summonerResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getMatchDetail(summoner: Summoner, matchId : string) {
    const url = this.apiUrl + `match/${summoner.region}/${matchId}`;
    try {
      const response = await fetch(url);
      const matchDetailResponse = await response.json() as MatchDetailResponseI;
      return matchDetailResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getLeagues(summoner: Summoner) {
    const url = this.apiUrl + `league/${summoner.regionCode}/${summoner.id}`;

    try {
      const response = await fetch(url);
      const leaguesResponse = await response.json() as LeagueI[];
      return leaguesResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getMatches(summoner: Summoner, macMin: number, macMax: number, queueId: string) {
    const url = this.apiUrl + `matches/${summoner.region}/${summoner.puuid}/${queueId}/${macMin}/${macMax}`;
    try {
      const response = await fetch(url);
      const matchesResponse = await response.json() as MatchesResponseI;
      return matchesResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getActiveMatch(summoner: Summoner) {
    const url = this.apiUrl + `activematch/${summoner.regionCode}/${summoner.id}`;

    try {
      const response = await fetch(url);
      const activeMatchResponse = await response.json() as ActiveMatchI;
      return activeMatchResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getScores() {
    const url = this.apiUrl + `score`;

    try {
      const response = await fetch(url);
      const scoreResponse = await response.json() as Score[];
      return scoreResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getScoresChamp(champName: string) {
    const url = this.apiUrl + `score/${champName}`;

    try {
      const response = await fetch(url);
      const champScoreResponse = await response.json() as Score[];
      return champScoreResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async postScore() {
    const url = this.apiUrl + `score/post`;

    try {
      const response = await fetch(url);
      const champScoreResponse = await response.json() as Score[];
      return champScoreResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}
