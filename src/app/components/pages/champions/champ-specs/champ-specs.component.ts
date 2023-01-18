import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { champSpecs } from './champ-specs.interface';
import { Score } from 'app/riot_api/model/score.interface';
import { RiotApiService } from 'app/riot_api/riotApi.service';


@Component({
  selector: 'app-champ-specs',
  templateUrl: './champ-specs.component.html',
  styleUrls: ['./champ-specs.component.css']
})
export class ChampSpecsComponent implements OnInit {

  name?: string;
  private sub: any;

  constructor(private route: ActivatedRoute, private riotApiService: RiotApiService,) {}

  champSpecs : champSpecs = {
    name: '',
    roles: [],
    kill: 0,
    death: 0,
    assist: 0,
    matchCount: 0,
    winCount: 0,
    winRate: 0,
    pickRate: 0,
    items: [],
    runes: [],
    strongerThan: [],
    weakerThan: []
  }

  imgUrlVersion: string = "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/";

  scores : Score[] = [];
  scoresMTDS : any;

  async getScores() {
    const scoresGet = await this.riotApiService.getScoresChamp(this.name as string);

    if(scoresGet && scoresGet != "error")
    {
      this.scores = scoresGet;
      this.statsForChamps(this.scores);
    }
  }

  statsForChamps(scores : Score[]){
    var tempChampSpecs : champSpecs = {
      name: this.name as string,
      roles: [],
      kill: 0,
      death: 0,
      assist: 0,
      matchCount: 0,
      winCount: 0,
      winRate: 0,
      pickRate: 0,
      items: [],
      runes: [],
      strongerThan: [],
      weakerThan: []
    };

    for(var score in scores)
    {

      tempChampSpecs.kill = ((tempChampSpecs.kill * tempChampSpecs.matchCount) + scores[score].kill) / (tempChampSpecs.matchCount + 1)
      tempChampSpecs.death = ((tempChampSpecs.death * tempChampSpecs.matchCount) + scores[score].death) / (tempChampSpecs.matchCount + 1)
      tempChampSpecs.assist = ((tempChampSpecs.assist * tempChampSpecs.matchCount) + scores[score].assist) / (tempChampSpecs.matchCount + 1)
      tempChampSpecs.matchCount += 1;
      tempChampSpecs.winRate = (tempChampSpecs.winCount/tempChampSpecs.matchCount) * 100;
      tempChampSpecs.pickRate = (tempChampSpecs.matchCount/scores.length) * 100;
      if(scores[score].win == 1)
      {
        tempChampSpecs.winCount+=1;
      }

      const role = Object.values(tempChampSpecs.roles).find(x => x === scores[score].lane);
      if(!role)
      {
        tempChampSpecs.roles.push(scores[score].lane);
      }

      for(var i in scores[score].items)
      {
        const item = Object.values(tempChampSpecs.items).find(x => x === scores[score].items[i]);
        if(!item)
        {
          tempChampSpecs.roles.push(scores[score].items[i]);
        }
      }

      for(var i in scores[score].runes)
      {
        const rune = Object.values(tempChampSpecs.runes).find(x => x === scores[score].runes[i]);
        if(!rune)
        {
          tempChampSpecs.roles.push(scores[score].runes[i]);
        }
      }

    }

    var a = tempChampSpecs;
    this.champSpecs = a;
    return a

  }

  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.name = params['name'];
    });
    await this.getScores();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
