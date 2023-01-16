import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RiotApiService } from './../../../riot_api/riotApi.service';
import { ChampTable, Score } from 'app/riot_api/model/score.interface';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { champStat } from '../homepage/components/stats-box/championStat.interface';
import { async } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(
    private riotApiService: RiotApiService,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  imgUrlVersion: string = "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/";

  scores : Score[] = [];
  scoresMTDS : any;

  champStats : ChampTable[] = [];
  champStatsMTDS : MatTableDataSource<ChampTable> = new MatTableDataSource<ChampTable>();

  async getScores() {
    const scoresGet = await this.riotApiService.getScores();

    if(scoresGet && scoresGet != "error")
    {
      this.scores = scoresGet;
      this.champStatsMTDS = new MatTableDataSource<ChampTable>(this.statsForChamps(this.scores));
      this.champStatsMTDS.sort = this.sortingen;
    }
  }

  statsForChamps(scores : Score[]){
    var tempChampScore : ChampTable[] = [];

    for(var score in scores)
    {
      const val = Object.values(tempChampScore).find(x => x.champName === scores[score].champName);
      if(val)
      {
        val.kill = ((val.kill * val.matchCount) + scores[score].kill) / (val.matchCount + 1)
        val.death = ((val.death * val.matchCount) + scores[score].death) / (val.matchCount + 1)
        val.assist = ((val.assist * val.matchCount) + scores[score].assist) / (val.matchCount + 1)
        val.farm = (((val.farm * val.matchCount) + scores[score].farm) / (val.matchCount + 1)) / ((scores[score].matchDuration) / 60)
        val.gold = (((val.gold * val.matchCount) + scores[score].gold) / (val.matchCount + 1)) / ((scores[score].matchDuration) / 60)
        val.matchCount += 1;
        val.pickRate = (val.matchCount/scores.length) * 100;
        if(scores[score].win == 1)
        {
          val.winCount+=1;
        }
        val.winRate = (val.winCount/val.matchCount) * 100;
      }
      else{
        var winCou = 0;
        var winRat = 0;
        var pickRat = (1/scores.length) * 100;
        if(scores[score].win == 1)
        {
          winCou = 1;
          winRat = 100;
        }

        var champ : ChampTable = {
          champName: scores[score].champName,
          kill: scores[score].kill,
          death: scores[score].death,
          assist: scores[score].assist,
          farm: scores[score].farm / (scores[score].matchDuration / 60),
          gold: scores[score].gold / (scores[score].matchDuration / 60),
          matchCount: 1,
          pickRate: pickRat,
          winCount: winCou,
          winRate: winRat,
        };
        tempChampScore.push(champ);
      }
    }
    var a = tempChampScore;
    this.champStats = a;
    return a
  }

  dChampColumns: string[] = ['champName', 'kill', 'death', 'assist', 'farm', 'gold', 'matchCount', 'pickRate', 'winRate'];

  @ViewChild('sortingen', { static: true }) sortingen: MatSort = new MatSort();

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getScores();
  }

}
