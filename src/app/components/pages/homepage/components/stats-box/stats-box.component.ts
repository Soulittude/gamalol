import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiotApiService } from 'app/riot_api/riotApi.service';
import { MatchesResponseI } from 'app/riot_api/model/matches.interface';
import { LeagueI } from 'app/riot_api/model/league.interface';
import { champStat } from './championStat.interface';
import { laneStat } from './laneStat.interface';
import { empty } from 'cheerio/lib/api/manipulation';
import { Summoner } from 'app/riot_api/model/summoner.interface';
import { MatchDetailResponseI, Participant } from 'app/riot_api/model/match.interface';

@Component({
  selector: 'app-stats-box',
  templateUrl: './stats-box.component.html',
  styleUrls: ['./stats-box.component.css']
})
export class StatsBoxComponent implements OnInit {

  constructor(

    private riotApiService: RiotApiService,
  ) {

    }

  @Input() summonerObj!: Summoner;

  @Input() soloqLb!: string[];
  @Input() flexLb!: string[];

  imgUrlVersion: string = "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/";
  imgUrl: string = "https://ddragon.leagueoflegends.com/cdn/img/";
  imgUrlPos: string = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/";

  soloqIcon: string = "asd";
  flexIcon: string = "asd";

  soloqTot : MatchDetailResponseI[] = [];
  flexTot : MatchDetailResponseI[] = [];
  allTot : MatchDetailResponseI[] = [];

  soloqMc : number = 0;
  flexMc : number = 0;
  allMc : number = 0;

  soloqWc : number = 0;
  flexWc : number = 0;
  allWc : number = 0;

  soloqLc : number = 0;
  flexLc : number = 0;
  allLc : number = 0;

  soloqWr : number = 0;
  flexWr : number = 0;
  allWr : number = 0;

  soloqKda : number[] = [0, 0, 0];
  flexKda : number[] = [0, 0, 0];
  allKda : number[] = [0, 0, 0];

  soloqChamps : champStat[] = [];
  flexChamps : champStat[] = [];
  allChamps : champStat[] = [];

  soloqLanes: laneStat[] = [];
  flexLanes: laneStat[] = [];
  allLanes: laneStat[] = [];

  sumMost: string = "Zed";

  statsBoxLoaded : boolean = false;

  async soloqGet()
  {
    const matchesGet = await this.riotApiService.getMatches(this.summonerObj, 0, 10, "420");

    if(matchesGet && matchesGet != "error")
    {
      this.soloqMc = matchesGet.length;
      for(var match in matchesGet)
      {
        const matchDet = await this.riotApiService.getMatchDetail(this.summonerObj, matchesGet[match]) as MatchDetailResponseI;
        this.soloqTot.push(matchDet);
      }
      var stats = await this.stat(this.soloqTot);

      this.soloqKda[0] = stats[0] as number;
      this.soloqKda[1] = stats[1] as number;
      this.soloqKda[2] = stats[2] as number;
      this.soloqWc = stats[3] as number;
      this.soloqLc = this.soloqMc - this.soloqWc;
      this.soloqWr = +((this.soloqWc/this.soloqTot.length)*100).toFixed(2);;
      this.soloqChamps = stats[4] as champStat[];
      this.soloqLanes = stats[5] as laneStat[];
    }

    this.soloqIcon = await (this.leagueToUrl(this.soloqLb[0]));
  }

  async flexGet()
  {
    const matchesGet = await this.riotApiService.getMatches(this.summonerObj, 0, 10, "440");

    if(matchesGet && matchesGet != "error")
    {
      this.flexMc = matchesGet.length;
      for(var match in matchesGet)
      {
        const matchDet = await this.riotApiService.getMatchDetail(this.summonerObj, matchesGet[match]) as MatchDetailResponseI;
        this.flexTot.push(matchDet);
      }
      var stats = await this.stat(this.flexTot);



      this.flexKda[0] = stats[0] as number;
      this.flexKda[1] = stats[1] as number;
      this.flexKda[2] = stats[2] as number;
      this.flexWc = stats[3] as number;
      this.flexLc = this.flexMc - this.flexWc;
      this.flexWr = +((this.flexWc/this.flexTot.length)*100).toFixed(2);;
      this.flexChamps = stats[4] as champStat[];
      this.flexLanes = stats[5] as laneStat[];
    }
    this.flexIcon = await (this.leagueToUrl(this.flexLb[0]));
  }

  async allGet()
  {
    const matchesGet = await this.riotApiService.getMatches(this.summonerObj, 0, 10, "77777");

    if(matchesGet && matchesGet != "error")
    {
      for(var match in matchesGet)
      {
        const matchDet = await this.riotApiService.getMatchDetail(this.summonerObj, matchesGet[match]) as MatchDetailResponseI;
        this.allTot.push(matchDet);
      }
      var stats = await this.stat(this.allTot);


      this.allKda[0] = stats[0] as number;
      this.allKda[1] = stats[1] as number;
      this.allKda[2] = stats[2] as number;
      this.allWc = stats[3] as number;
      this.allWr = +((this.allWc/this.allTot.length)*100).toFixed(2);;
      this.allChamps = stats[4] as champStat[];
      this.allLanes = stats[5] as laneStat[];

      this.sumMost = this.allChamps[0].name;
    }
  }

  async stat(matches : MatchDetailResponseI[])
  {
    var particiSum;

    var winCount : number = 0;

    var kills : number = 0;
    var deaths: number = 0;
    var assists: number = 0;

    var champions : champStat[] = [];
    var chName: string;

    var lanes : laneStat[] = [];
    var laneName : string;

    for(var match in matches)
    {

      var particiler = matches[match].info?.participants as Participant[];
      for(var partici in particiler)
      {
        if(particiler[partici].summonerName == this.summonerObj.name)
        {
          particiSum = particiler[partici]

          if(particiSum.win)
          {
            winCount +=1;
          }

          kills += particiSum.kills;
          deaths += particiSum.deaths;
          assists += particiSum.assists;

          if(particiSum.teamPosition)
            laneName = (particiSum.teamPosition).toLowerCase();
          else
            laneName = "none";
          const val = Object.values(lanes).find(x => x.name === laneName);
          if(val)
          {
            val.played += 1;
            if(particiSum.win)
            {
              val.win += 1;
              val.wr = +((val.win/val.played)*100).toFixed(2);
            }
            val.kills = +((val.kills+particiSum.kills)/val.played).toFixed(2);
            val.deaths = +((val.deaths+particiSum.deaths)/val.played).toFixed(2);
            val.assists = +((val.assists+particiSum.assists)/val.played).toFixed(2);
          }
          else
          {
            var winCou = 0;
            var wrLane = 0;
            if(particiSum.win)
            {
              winCou = 1;
              wrLane = 100;
            }
            var lane : laneStat = {
              name: laneName,
              played: 1,
              win: winCou,
              wr: wrLane,
              kills: particiSum.kills,
              deaths: particiSum.deaths,
              assists: particiSum.assists,
            };
            lanes.push(lane);
          }



          if(particiSum.championName == 'FiddleSticks')
          {
            chName = 'Fiddlesticks';
          }
          else{
            chName = particiSum.championName;
          }

          const value = Object.values(champions).find(x => x.name === chName);
          if(value)
          {
            value.played += 1;
            if(particiSum.win)
            {
              value.win += 1;
              value.wr = +((value.win/value.played)*100).toFixed(2);
            }
            value.kills = +((value.kills+particiSum.kills)/value.played).toFixed(2);
            value.deaths = +((value.deaths+particiSum.deaths)/value.played).toFixed(2);
            value.assists = +((value.assists+particiSum.assists)/value.played).toFixed(2);
          }
          else
          {
            var winRes = 0;
            var wrChamp = 0;
            if(particiSum.win)
            {
              winRes = 1;
              wrChamp = 100;
            }
            var champion : champStat = {
              name: chName,
              played: 1,
              win: winRes,
              wr: wrChamp,
              kills: particiSum.kills,
              deaths: particiSum.deaths,
              assists: particiSum.assists,
            };
            champions.push(champion);
          }
        }
      }
    }

    var sortedArray: champStat[] = this.allChamps.sort((obj1, obj2) => {
      if (obj2.played > obj2.played) {
          return 1;
      }

      if (obj2.played < obj1.played) {
          return -1;
      }
      if (obj1.played = obj2.played) {
        if (obj2.win > obj1.win) {
          return 1;
        }
        if (obj2.win < obj1.win) {
          return -1;
        }
      }

      return 0;
    });


    this.allChamps = sortedArray;


    kills = +(kills/matches.length).toFixed(2);
    deaths = +(deaths/matches.length).toFixed(2);
    assists = +(assists/matches.length).toFixed(2);

    return [kills, deaths, assists, winCount, champions, lanes];
  }

  async leagueToUrl(lea : string)
  {
    return(`./src/assets/emblem-${lea}.png`.toLowerCase())
  }

  @Output() loaded = new EventEmitter<boolean>();

  loadedC() {
    this.loaded.emit(this.statsBoxLoaded);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.statsBoxLoaded = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.soloqGet();
    this.flexGet();
    this.allGet();
  }

}
