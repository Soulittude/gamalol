import { Component, OnInit , Input } from '@angular/core';
import { RiotApiService } from './../../../riot_api/riotApi.service';
import { Summoner, ChampionMasteryResponse, MatchesResponse, MatchDetailResponse, Metadata} from './../../../riot_api/riotaApi.interface';
import { details } from './../../../json/champions';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

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

  championIcons = [
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Aatrox.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Ahri.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Akali.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Akshan.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Alistar.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Amumu.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Anivia.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Annie.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Aphelios.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Ashe.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/AurelionSol.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Azir.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Bard.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Belveth.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Blitzcrank.png",
    "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Brand.png"
  ];

  sumNick = 'Coconut';
  sumServer = 'tr1';

  macVar : boolean = false;
  sumVar : boolean = false;

  summoner: Summoner = {};

  imgUrlVersion: string = "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/";
  imgUrl: string = "https://ddragon.leagueoflegends.com/cdn/img/";

  sumIcon: string = "asd";

  leagueUrl: string = "asd";

  ustaliklar: ChampionMasteryResponse = [];
  matches: MatchesResponse = [];

  matchId = '';
  match: MatchDetailResponse = {};

  champNameTemporary = 'Zed';

  async summonerFind(nick: string, sv: string) {
    const summonerGet = await this.riotApiService.getSummoner(nick, sv);
    if (summonerGet) {
      this.summoner = summonerGet;
      this.sumVar = true;
      this.sumIcon = this.imgUrlVersion + "profileicon/" + (summonerGet.profileIconId?.toString() as string) + ".png";
      this.matchesFind();
    }
  }

  async yazdirr(asd : string)
  {
    alert(asd);
  }

  async matchesFind() {
    const matchesGet = await this.riotApiService.getMatches(this.summoner);
    if (matchesGet) {
      this.macVar = true;
      this.matches = matchesGet;
      //this.sumVar = false;
      //this.macVar = false;
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

  async idToChamp(champId: String) {

    const dict = details.data;
    const value = Object.values(dict).find(x => x.key === champId);
    if(value)
    {
      this.champNameTemporary = value.id;
    }
  }

  ngOnInit(): void {
  }

}
