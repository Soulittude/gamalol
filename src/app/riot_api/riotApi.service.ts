import { Injectable } from '@angular/core';
import { LeagueI } from './model/league.interface';
import { ActiveMatchI } from './model/activematch.interface';
import { ChampionI } from './model/champion.interface';
import { Summoner } from './model/summoner.interface';
import { MatchDetailResponseI } from './model/match.interface';
import { MatchesResponseI } from './model/matches.interface';
import { Score, ScoreDto } from './model/score.interface';

@Injectable({
  providedIn: 'root',
})
export class RiotApiService {
  apiUrl = 'http://localhost:3000/api/';
  //apiUrl = 'https://loljs.onrender.com/api/';

  async getSummoner(summonerName: string, summonerServer: string) {
    const url = this.apiUrl + `summoner/${summonerServer}/${summonerName}`;

    try {
      const response = await fetch(url);
      if(response.status == 200){
        const summonerResponse = await response.json() as Summoner;
        return summonerResponse;
      }
      else{return "error"}
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getMatchDetail(summoner: Summoner, matchId : string) {
    const url = this.apiUrl + `match/${summoner.region}/${matchId}`;
    try {
      const response = await fetch(url);
      if(response.status == 200){
        const matchDetailResponse = await response.json() as MatchDetailResponseI;
        return matchDetailResponse;
      }
      else{return "error"}
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getLeagues(summoner: Summoner) {
    const url = this.apiUrl + `league/${summoner.regionCode}/${summoner.id}`;

    try {
      const response = await fetch(url);
      if(response.status == 200){
        const leaguesResponse = await response.json() as LeagueI[];
        return leaguesResponse;
      }
      else{return "error"}
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getMatches(summoner: Summoner, macMin: number, macMax: number, queueId: string) {
    const url = this.apiUrl + `matches/${summoner.region}/${summoner.puuid}/${queueId}/${macMin}/${macMax}`;
    try {
      const response = await fetch(url);
      if(response.status == 200){
        const matchesResponse = await response.json() as MatchesResponseI;
        return matchesResponse;
      }
      else{return "error"}
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getActiveMatch(summoner: Summoner) {
    const url = this.apiUrl + `activematch/${summoner.regionCode}/${summoner.id}`;

    try {
      const response = await fetch(url);
      if(response.status == 200){
        const activeMatchResponse = await response.json() as ActiveMatchI;
        return activeMatchResponse;
      }
      else{return "error"}
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getScores() {
    const url = this.apiUrl + `score`;

    try {
      const response = await fetch(url);
      if(response.status == 200){
        const scoreResponse = await response.json() as Score[];
        return scoreResponse;
      }
      else{return "error"}
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getScoresChamp(champName: string) {
    const url = this.apiUrl + `score/${champName}`;

    try {
      const response = await fetch(url);
      if(response.status == 200){
        const champScoreResponse = await response.json() as Score[];
        return champScoreResponse;
      }
      else{return "error"}
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async postScore(score: ScoreDto) {
    const url = this.apiUrl + `score`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(score)
    };

    try {
      const response = await fetch(url, requestOptions);
      const champScoreResponse = await response.json() as Score[];
      return champScoreResponse;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async checkScore(matchId: string, summonerName: string) {
    const url = this.apiUrl + `score/check/${matchId}/${summonerName}`;

    try {
      const response = await fetch(url);
      if(response.status == 200){
        const champScoreResponse = await response.json() as Boolean;
        return champScoreResponse;
      }
      else{return "error"}
    } catch (error) {
      console.log(error);
    }
    return null;
  }

}
