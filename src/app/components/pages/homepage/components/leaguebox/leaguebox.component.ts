import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { MatchDetailResponse, Participant, Summoner } from 'app/riot_api/riotaApi.interface';
import { RiotApiService } from 'app/riot_api/riotApi.service';
import { leagueI } from 'app/riot_api/league.interface';
import { MatchesResponse } from 'app/riot_api/riotaApi.interface';

@Component({
  selector: 'app-leaguebox',
  templateUrl: './leaguebox.component.html',
  styleUrls: ['./leaguebox.component.css']
})
export class LeagueboxComponent implements OnInit {

  constructor(
    private riotApiService: RiotApiService,
  ) { }

  @Input() summonerObj!: Summoner;

  @Input() soloqUrlLb!: string;
  @Input() flexUrlLb!: string;

  soloqTot : MatchDetailResponse[] = [];
  flexTot : MatchDetailResponse[] = [];
  allTot : MatchDetailResponse[] = [];

  soloqWin : number = 0;
  flexWin : number = 0;
  allWin : number = 0;

  soloqWr : number = 0;
  flexWr : number = 0;
  allWr : number = 0;

  async soloqGet()
  {
    const matchesGet = await this.riotApiService.getMatches(this.summonerObj, 0, 20, "420");

    if(matchesGet)
    {
      for(var match in matchesGet)
      {
        const matchDet = await this.riotApiService.getMatchDetail(this.summonerObj, matchesGet[match]) as MatchDetailResponse;
        this.soloqTot.push(matchDet);
      }
      this.soloqWin = await this.stat(this.soloqTot);
      this.soloqWr = this.soloqWin/this.soloqTot.length;
    }
  }

  async flexGet()
  {
    const matchesGet = await this.riotApiService.getMatches(this.summonerObj, 0, 20, "440");

    if(matchesGet)
    {
      for(var match in matchesGet)
      {
        const matchDet = await this.riotApiService.getMatchDetail(this.summonerObj, matchesGet[match]) as MatchDetailResponse;
        this.flexTot.push(matchDet);
      }
      this.flexWin = await this.stat(this.flexTot);
      this.flexWr = this.flexWin/this.flexTot.length;
    }
  }

  async allGet()
  {
    const matchesGet = await this.riotApiService.getMatches(this.summonerObj, 0, 20, "77777");

    if(matchesGet)
    {
      for(var match in matchesGet)
      {
        const matchDet = await this.riotApiService.getMatchDetail(this.summonerObj, matchesGet[match]) as MatchDetailResponse;
        this.allTot.push(matchDet);
      }
      this.allWin = await this.stat(this.flexTot);
      this.allWr = this.allWin/this.allTot.length;
    }
  }

  async stat(matches : MatchDetailResponse[])
  {
    var mCou = matches.length;
    var mWin : number = 0;
    var particiSum;

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
            mWin +=1;
          }
        }
      }
    }
    return mWin;
  }

  ngOnInit(): void {
    this.soloqGet();
    this.flexGet();
    this.allGet();
  }

}
