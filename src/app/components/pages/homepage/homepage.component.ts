import { Component, OnInit , Input } from '@angular/core';
import { RiotApiService } from './../../../riot_api/riotApi.service';
import { Summoner, ChampionMasteryResponse, MatchesResponse, MatchDetailResponse, Metadata} from './../../../riot_api/riotaApi.interface';
import { championsArr } from './../../../json/champions';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { leagueI } from 'app/riot_api/league.interface';
import { Observable, of } from "rxjs";
import { championI, Data } from 'app/riot_api/champion.interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }],
})

export class HomepageComponent implements OnInit {

  constructor(
    private riotApiService: RiotApiService,
  ) { }

  sumNick = 'Coconut';
  sumServer = 'tr1';

  macVar : boolean = false;
  sumVar : boolean = false;
  moreMacVar : boolean = false;

  summoner: Summoner = {};

  imgUrlVersion: string = "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/";
  imgUrl: string = "https://ddragon.leagueoflegends.com/cdn/img/";

  sumIcon: string = "asd";

  soloq: string[] = ['Unranked', ''];
  flex: string[] = ['Unranked', ''];

  soloqUrl: string = "asd";

  ustaliklar: ChampionMasteryResponse = [];
  matches: MatchesResponse = [];

  macMin = 0;
  macMax = 10;
  matchId = '';
  match: MatchDetailResponse = {};

  champNameTemporary = 'Zed';

  async summonerFind(nick: string, sv: string) {
    const summonerGet = await this.riotApiService.getSummoner(nick, sv);
    if (summonerGet) {
      this.summoner = summonerGet;
      this.sumIcon = this.imgUrlVersion + "profileicon/" + (summonerGet.profileIconId?.toString() as string) + ".png";
      //this.matchesFind(this.macMin, this.macMax);
      /*
      const leaguesGet = await this.riotApiService.getLeagues(this.summoner) as leagueI[];
      if(leaguesGet)
      {
        for(var league in leaguesGet)
        {
          if(leaguesGet[league].queueType == "RANKED_SOLO_5x5")
          {
            this.soloq[0] = leaguesGet[league].tier;
            this.soloq[1] = leaguesGet[league].rank;
          }

          if(leaguesGet[league].queueType == "RANKED_FLEX_SR")
          {
            this.flex[0] = leaguesGet[league].tier;
            this.flex[1] = leaguesGet[league].rank;
          }
        }
        this.leagueToUrl(this.soloq[0], this.soloq[1]);
      }*/
    }
    else {
      this.sumVar = false;
    }
  }

  async leagueToUrl(lea : string, div: string)
  {
    this.soloqUrl = `/assets/emblem-${lea}.png`.toLowerCase();
  }

  async yazdirr(asd : string)
  {
    alert(asd);
  }

  async matchesFind(macMin:number, macMax:number) {
    const matchesGet = await this.riotApiService.getMatches(this.summoner, macMin, macMax, "77777");
    if (matchesGet) {
      if(this.macMin == 0)
      {
        alert(1)
        this.macVar = true;
        this.sumVar = true;
      }
      else
      {
        alert(2)
        this.macVar = false;
      }
      this.moreMacVar = true;
      this.matches = matchesGet;
      //this.sumVar = false;
      //this.macVar = false;
    }
    else{
      alert(3)
      this.macVar = false;
      this.moreMacVar = false;
    }
  }

  async matchDetailFind() {
    const matchDetailGet = await this.riotApiService.getMatchDetail(this.summoner, this.matchId);
    if (matchDetailGet) {
      this.match = matchDetailGet;//************************************************* */
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

  async activeMatchFind() {
    const activeMatchGet = await this.riotApiService.getActiveMatch(this.summoner);
    if (activeMatchGet) {
      console.log(activeMatchGet);
    }
  }

  async moreMatches()
  {
    this.macVar = false;
    this.macMin +=10;
    this.macMax +=10;
    this.matchesFind(this.macMin, this.macMax);
  }

  async idToChamp(champId: String) {

    const dict = championsArr.data;
    const value = Object.values(dict).find(x => x.key === champId);
    if(value)
    {
      this.champNameTemporary = value.id;
    }
  }

  ngOnInit(): void {
  }

}
