import { Component, Input } from '@angular/core';
import { RiotApiService } from './riot_api/riotApi.service';
import { Summoner, ChampionMasteryResponse, MatchesResponse, MatchDetailResponse, Metadata} from './riot_api/riotaApi.interface';
import { details } from './json/champions';

@Component({
  selector: 'app-root', //bu bizim <app-root> tagimiz
  templateUrl: './app.component.html', //Bu Typescript dosyasının hangi html ile ilişkili olduğu belirtiliyor
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private riotApiService: RiotApiService,
  ) {}

  sumNick = 'Coconut';
  sumServer = 'tr1';

  summoner: Summoner = {};

  ustaliklar: ChampionMasteryResponse = [];
  matches: MatchesResponse = [];

  matchId = '';
  match: MatchDetailResponse = {};

  champNameTemporary = 'Zed';

  async summonerFind() {
    const summonerGet = await this.riotApiService.getSummoner(this.sumNick, this.sumServer);
    if (summonerGet) {
      this.summoner = summonerGet;
    }
  }

  async masteryFind() {
    const masteriesGet = await this.riotApiService.getMastery(this.summoner);
    if (masteriesGet) {
      this.summoner.champMasteries = masteriesGet;
      const a = this.summoner.champMasteries[0].championId;
      const b = String(a);
      this.idToChamp(b);
    }
  }

  async matchesFind() {
    const matchesGet = await this.riotApiService.getMatches(this.summoner);
    if (matchesGet) {
      this.matches = matchesGet;
    }
  }

  async matchDetailFind() {
    const matchDetailGet = await this.riotApiService.getMatchDetail(this.summoner, this.matchId);
    if (matchDetailGet) {
      console.log(matchDetailGet);
      this.match = matchDetailGet;//************************************************* */
    }
  }

  async activeMatchFind() {
    const activeMatchGet = await this.riotApiService.getActiveMatch(this.summoner);
    if (activeMatchGet) {
      console.log(activeMatchGet);
    }
  }

  async idToChamp(champId: String) {

    const dict = details.data;
    const value = Object.values(dict).find(x => x.key === champId);
    if(value)
    {
      this.champNameTemporary = value.id;
    }
  }
}




