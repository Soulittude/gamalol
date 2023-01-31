import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiotApiService } from 'app/riot_api/riotApi.service';
import { MatchesResponseI } from 'app/riot_api/model/matches.interface';
import { LeagueI } from 'app/riot_api/model/league.interface';
import { statI } from './stat.interface';
import { empty } from 'cheerio/lib/api/manipulation';
import { Summoner } from 'app/riot_api/model/summoner.interface';
import { MatchDetailResponseI, Participant } from 'app/riot_api/model/match.interface';
import { statsBoxI } from './stats-box.interface';

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
  imgUrlPos: string = "https://raw.communitydragon.org/latest/plugins/"
  +"rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/";

  soloqIcon: string = "asd";
  flexIcon: string = "asd";


  sumMost: string = "Zed";

  soloqStats : statsBoxI | any;

  flexStats : statsBoxI | any;

  allStats : statsBoxI | any;

  statsBoxLoaded : boolean = false;

  async getStats(matchCode : string)
  {
    var tempStats : statsBoxI = {
      totalMatches: [],
      matchCount: 0,
      winCount: 0,
      loseCount: 0,
      winRate: 0,
      kda: [],
      champions: [],
      lanes: [],
      league: '',
      division: '',
      leagueUrl: ''
    };

    if(matchCode == "420")
    {
      tempStats.league = this.soloqLb[0];
      tempStats.leagueUrl = (this.leagueToUrl(this.soloqLb[0]));
      tempStats.division = this.soloqLb[1];
    }

    else if(matchCode == "440")
    {
      tempStats.league = this.flexLb[0];
      tempStats.leagueUrl = (this.leagueToUrl(this.flexLb[0]));
      tempStats.division = this.flexLb[1];
    }

    const matchesGet = await this.riotApiService.getMatches(this.summonerObj, 0, 10, matchCode);

    if(matchesGet && matchesGet != "error")
    {
      tempStats.matchCount = matchesGet.length;
      for(var match in matchesGet)
      {
        const matchDet = await this.riotApiService.getMatchDetail
        (this.summonerObj, matchesGet[match]) as MatchDetailResponseI;
        tempStats.totalMatches.push(matchDet);
      }
      var stat = await this.stat(tempStats.totalMatches);

      tempStats.kda[0] = stat[0] as number;
      tempStats.kda[1] = stat[1] as number;
      tempStats.kda[2] = stat[2] as number;
      tempStats.winCount = stat[3] as number;
      tempStats.loseCount = tempStats.matchCount - tempStats.winCount;
      tempStats.winRate = (tempStats.winCount/tempStats.totalMatches.length)*100;
      tempStats.champions = stat[4] as statI[];
      tempStats.lanes = stat[5] as statI[];
    }

    tempStats.kda[0] = +((tempStats.kda[0]).toFixed(1));
    tempStats.kda[1] = +((tempStats.kda[1]).toFixed(1));
    tempStats.kda[2] = +((tempStats.kda[2]).toFixed(1));
    tempStats.winRate = +((tempStats.winRate).toFixed(1));

    tempStats.champions = await this.sorter(tempStats.champions);
    tempStats.lanes = await this.sorter(tempStats.lanes);

    return tempStats;

  }

  async stat(matches : MatchDetailResponseI[])
  {
    var particiSum;

    var winCount : number = 0;

    var kills : number = 0;
    var deaths: number = 0;
    var assists: number = 0;

    const championsArray : statI[] = [];

    let chName: string;

    let lanesArray : statI[] = [];
    var laneName : string;

    for(var match in matches)
    {
      var particiler = matches[match].info?.participants as Participant[];
      for(var partici in particiler)
      {
        if(particiler[partici].summonerName == this.summonerObj.name)
        {
          particiSum = particiler[partici] as Participant;

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

          const val = Object.values(lanesArray).find(x => x.name === laneName);
          if(val)
          {
            val.matchCount += 1;
            if(particiSum.win)
            {
              val.winCount += 1;
              val.winRate = +(val.winCount/val.matchCount)*100;
            }
            val.kills = +(val.kills+particiSum.kills)/val.matchCount;
            val.deaths = +(val.deaths+particiSum.deaths)/val.matchCount;
            val.assists = +(val.assists+particiSum.assists)/val.matchCount;
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
            var lane : statI = {
              name: laneName,
              matchCount: 1,
              winCount: winCou,
              winRate: wrLane,
              kills: particiSum.kills,
              deaths: particiSum.deaths,
              assists: particiSum.assists,
            };
            lanesArray.push(lane);
          }

          if(particiSum.championName == 'FiddleSticks')
          {
            chName = 'Fiddlesticks';
          }
          else{
            chName = particiSum.championName;
          }

          const value = Object.values(championsArray).find(x => x.name === chName);
          if(value)
          {
            value.matchCount += 1;
            if(particiSum.win)
            {
              value.winCount += 1;
              value.winRate = (value.winCount/value.matchCount)*100;
            }
            value.kills = (value.kills+particiSum.kills)/value.matchCount;
            value.deaths = (value.deaths+particiSum.deaths)/value.matchCount;
            value.assists = (value.assists+particiSum.assists)/value.matchCount;
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
            var champion : statI = {
              name: chName,
              matchCount: 1,
              winCount: winRes,
              winRate: wrChamp,
              kills: particiSum.kills,
              deaths: particiSum.deaths,
              assists: particiSum.assists,
            };
            championsArray.push(champion);
          }
        }
      }
    }

    kills = kills/matches.length;
    deaths = deaths/matches.length;
    assists = assists/matches.length;

    return [kills, deaths, assists, winCount, championsArray, lanesArray];
  }

  leagueToUrl(lea : string)
  {
    return(`assets/emblem-${lea}.png`.toLowerCase())
  }

  async sorter(statsToSort: statI[]){


    statsToSort.sort((one, two) => (one.matchCount > two.matchCount ? -1 : 1));

    for(var i in statsToSort)
    {
      statsToSort[i].kills = +(statsToSort[i].kills).toFixed(1);

      statsToSort[i].deaths = +(statsToSort[i].deaths).toFixed(1);
      statsToSort[i].assists = +(statsToSort[i].assists).toFixed(1);
      statsToSort[i].winRate = +(statsToSort[i].winRate).toFixed(1);
    }

    return statsToSort;
  }

  async statStart()
  {
    this.soloqStats = await this.getStats("420");
    this.flexStats = await this.getStats("440");
    this.allStats = await this.getStats("77777");
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
    this.statStart();
  }

}
