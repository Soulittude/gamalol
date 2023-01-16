import { Component, OnInit , Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiotApiService } from 'app/riot_api/riotApi.service';
import { championsArr } from 'app/json/champions';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { LeagueI } from 'app/riot_api/model/league.interface';
import { Observable, of } from "rxjs";
import { ChampionI } from 'app/riot_api/model/champion.interface';
import { Summoner } from 'app/riot_api/model/summoner.interface';
import { MatchesResponseI } from 'app/riot_api/model/matches.interface';
import { MatchDetailResponseI } from 'app/riot_api/model/match.interface';

@Component({
  selector: 'app-sum-box',
  templateUrl: './sum-box.component.html',
  styleUrls: ['./sum-box.component.css']
})
export class SumBoxComponent implements OnInit {

  constructor(
    private riotApiService: RiotApiService,
  ) { }

  sumNick = 'Coconut';
  sumServer = 'tr1';

  macVar : boolean = false;
  sumVar : boolean = false;
  moreMacVar : boolean = false;

  summoner: Summoner = {};

  sumMostChamp = "Leblanc";

  imgUrlVersion: string = "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/";
  imgUrl: string = "https://ddragon.leagueoflegends.com/cdn/img/";

  sumIcon: string = "asd";

  soloq: string[] = ['Unranked', ''];
  flex: string[] = ['Unranked', ''];

  soloqUrl: string = "asd";
  flexUrl: string = "asd";

  matches: any[] = [];

  macMin = 0;
  macMax = 10;
  matchId = '';
  match: MatchDetailResponseI = {};

  loaded : boolean = false;

  champNameTemporary = 'Zed';

  count:number=1;

  async summonerFind(nick: string, sv: string) {
    const summonerGet = await this.riotApiService.getSummoner(nick, sv);

    if (summonerGet != "error" && summonerGet) {
      this.summoner = summonerGet;
      this.sumIcon = this.imgUrlVersion + "profileicon/" + (summonerGet.profileIconId?.toString() as string) + ".png";
      this.matchesFind("first");

      const leaguesGet = await this.riotApiService.getLeagues(this.summoner) as LeagueI[];
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
        this.soloqUrl = await this.leagueToUrl(this.soloq[0]);
        this.flexUrl = await this.leagueToUrl(this.flex[0]);
      }
      this.sumVar = true;
    }
    else {
      this.sumVar = false;
    }
  }

  async leagueToUrl(lea : string)
  {
    return(`/assets/emblem-${lea}.png`.toLowerCase())
  }

  async matchesFind(moreWant : string) {
    if(moreWant == "more"){
      this.macMin +=10;
      this.macMax +=10;
    }
    const matchesGet = await this.riotApiService.getMatches(this.summoner,this.macMin, this.macMax, "77777");
    if (matchesGet && matchesGet != "error") {
      for(var match in matchesGet)
      {
        this.matches.push(matchesGet[match]);
      }

      this.macVar = true;
      this.moreMacVar = true;
    }
    else{
      this.macVar = false;
      this.moreMacVar = false;
    }
  }

  async moreMatch(){
    this.count=this.count+1;
    this.matchesFind("more");
  }

  async matchDetailFind() {
    const matchDetailGet = await this.riotApiService.getMatchDetail(this.summoner, this.matchId);
    if (matchDetailGet && matchDetailGet != "error") {
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

    const dict = championsArr.data;
    const value = Object.values(dict).find(x => x.key === champId);
    if(value)
    {
      this.champNameTemporary = value.id;
    }
  }

  @Input() nick!: string;
  @Input() sv!: string;

  ngOnInit(): void {
    this.summonerFind(this.nick, this.sv)
  }


  ngAfterViewChecked(): void {
    this.loaded = true;
  }


}
