import { Component, OnInit, Input } from '@angular/core';
import { RiotApiService } from './../../../riot_api/riotApi.service';
import { MatchesResponse, MatchDetailResponse, Metadata, Summoner, Info, Participant} from './../../../riot_api/riotaApi.interface';

@Component({
  selector: 'app-matchcont',
  templateUrl: './matchcont.component.html',
  styleUrls: ['./matchcont.component.css']
})
export class MatchcontComponent implements OnInit {

  match: MatchDetailResponse = {};

  particiler: Participant[] = [];

  minSec : string = "asd";

  constructor(
    private riotApiService: RiotApiService,
  ) { }

  async matchDetailFind(summoner: Summoner, matchId: string) {
    const matchDetailGet = await this.riotApiService.getMatchDetail(summoner, matchId);
    if (matchDetailGet) {
      this.match = matchDetailGet;
      this.particiler = matchDetailGet.info?.participants as Participant[];
      var seconds = matchDetailGet.info?.gameDuration;
      if(seconds)
        this.secondsToMinSec(seconds);
    }
  }

  secondsToMinSec(time:number)
  {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;

    var minuteStr = `${minutes}`

    var secondStr = `${seconds}`

    if(minutes <=9){
      minuteStr = `0${minutes}`}

    if(seconds <=9){
      secondStr = `0${seconds}`}


    this.minSec = `${minuteStr}:${secondStr}`
  }

  @Input() matchId!: string;
  @Input() summonerObj!: Summoner;

  ngOnInit(): void {
    this.matchDetailFind(this.summonerObj, this.matchId);
  }

}
