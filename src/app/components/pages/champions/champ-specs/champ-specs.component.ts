import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { champSpecs } from './champ-specs.interface';
import { Score } from 'app/riot_api/model/score.interface';
import { RiotApiService } from 'app/riot_api/riotApi.service';
import { champDataJ } from 'app/json/champData';
import { championsArr } from 'app/json/champions';
import { spellIdArr } from 'app/json/spellsId';
import { MajorRunesI, Rune, Slot } from 'app/riot_api/model/runes.interface';
import { runeIdArr } from 'app/json/runeIds';
import { ConvertService } from 'app/convert.service';
import { data } from 'cheerio/lib/api/attributes';
import { bestSummonersTable } from './best-summoner.interface';

@Component({
  selector: 'app-champ-specs',
  templateUrl: './champ-specs.component.html',
  styleUrls: ['./champ-specs.component.css']
})
export class ChampSpecsComponent implements OnInit {

  name?: string;
  private sub: any;

  imgUrlVersion: string = "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/";
  imgUrl: string = "https://ddragon.leagueoflegends.com/cdn/img/";

  allCount = 0;

  constructor(private route: ActivatedRoute
    , private riotApiService: RiotApiService,
     private convertService: ConvertService) {}

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
    spells: [],
    majorRunes: [],
    minorRunes: [],
    strongs: [],
    weaks: []
  }

  bestSummoners : bestSummonersTable[] = [];

  displayedColumns: string[] = ['sumName', 'kda', 'matchCount', 'winRate'];

  scores : Score[] = [];
  scoresMTDS : any;

  async getScores() {
    const scoresGet = await this.riotApiService.getScoresChamp(this.name as string);
    const allMatches = await this.riotApiService.getScores() as Score[];

    if(allMatches)
    {
      this.allCount = allMatches.length;
    }

    if(scoresGet && scoresGet != "error")
    {
      this.scores = scoresGet;

      const scoreData = this.statsForChamps(this.scores)
      const [champions, summoners] = scoreData;

      this.champSpecs = champions;
      this.bestSummoners = summoners;

    }

  }

  statsForChamps(scores : Score[]){

    const tempChampSpecs : champSpecs = {
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
      spells: [],
      majorRunes: [],
      minorRunes: [],
      strongs: [],
      weaks: []
    };

    const tempSummoners : bestSummonersTable[] = [];
    let champs = champDataJ.champions;

    const champ = Object.values(champs).find(x => x.name === this.name);
    if(champ)
    {
      tempChampSpecs.strongs = champ.hardChamps;
      tempChampSpecs.weaks = champ.easyChamps;
    }

    tempChampSpecs.pickRate = (this.scores.length/this.allCount) * 100;

    for(var score in scores)
    {
      const tempSummoner : bestSummonersTable = {
        sumName: '',
        kda: [],
        matchCount: 0,
        winRate: 0
      };

      tempChampSpecs.kill = ((tempChampSpecs.kill * tempChampSpecs.matchCount)
       + scores[score].kill) / (tempChampSpecs.matchCount + 1)
      tempChampSpecs.death = ((tempChampSpecs.death * tempChampSpecs.matchCount)
       + scores[score].death) / (tempChampSpecs.matchCount + 1)
      tempChampSpecs.assist = ((tempChampSpecs.assist * tempChampSpecs.matchCount)
       + scores[score].assist) / (tempChampSpecs.matchCount + 1)
      tempChampSpecs.matchCount += 1;
      tempChampSpecs.winRate = (tempChampSpecs.winCount/tempChampSpecs.matchCount) * 100;

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
        const item = Object.values(tempChampSpecs.items).find(x => x === i);
        if(!item)
        {
          tempChampSpecs.items.push(scores[score].items[i]);
        }
      }

      let spellsReady = this.convertService.spellIdToName(scores[score].spells[0],
         scores[score].spells[1]);

      const spell1 = Object.values(tempChampSpecs.spells).find(x => x === spellsReady[0]);
      if(!spell1)
      {
        tempChampSpecs.spells.push(spellsReady[0]);
      }

      const spell2 = Object.values(tempChampSpecs.spells).find(x => x === spellsReady[2]);
      if(!spell2)
      {
        tempChampSpecs.spells.push(spellsReady[2]);
      }

      let readyRunes = this.convertService.runeIdToUrl(scores[score].majorRune,
         scores[score].minorRune);

      const majRune = Object.values(tempChampSpecs.majorRunes).find(
        x => x === readyRunes[0]);
      if(!majRune)
      {
        tempChampSpecs.majorRunes.push(readyRunes[0]);
      }

      const minRune = Object.values(tempChampSpecs.minorRunes).find(
        x => x === readyRunes[2]);
      if(!minRune)
      {
        tempChampSpecs.minorRunes.push(readyRunes[2]);
      }

      tempChampSpecs.items = this.sortByFrequency(
        tempChampSpecs.items)
      tempChampSpecs.spells = this.sortByFrequency(
        tempChampSpecs.spells)
      tempChampSpecs.majorRunes = this.sortByFrequency(
        tempChampSpecs.majorRunes)
      tempChampSpecs.minorRunes = this.sortByFrequency(
        tempChampSpecs.minorRunes)

      const summonerCheck = Object.values(tempSummoners).find(
        x => x.sumName === scores[score].sumName);
      if(summonerCheck)
      {
        if(scores[score].win)
        {
          summonerCheck.winRate = ((summonerCheck.matchCount *
             summonerCheck.winRate) + 100) / (summonerCheck.matchCount + 1);
        }
        else{
          summonerCheck.winRate = ((summonerCheck.matchCount *
             summonerCheck.winRate) + 0) / (summonerCheck.matchCount + 1);
        }

        summonerCheck.kda[0] = ((summonerCheck.matchCount *
           summonerCheck.kda[0]) + scores[score].kill) / (summonerCheck.matchCount + 1);
        summonerCheck.kda[1] = ((summonerCheck.matchCount *
           summonerCheck.kda[1]) + scores[score].death) / (summonerCheck.matchCount + 1);
        summonerCheck.kda[2] = ((summonerCheck.matchCount *
           summonerCheck.kda[2]) + scores[score].assist) / (summonerCheck.matchCount + 1);
        summonerCheck.matchCount = summonerCheck.matchCount + 1;

      }

      else{
        tempSummoner.sumName = scores[score].sumName;
        tempSummoner.kda = [scores[score].kill, scores[score].death, scores[score].assist];
        tempSummoner.matchCount = 1;

        if(scores[score].win)
        {
          tempSummoner.winRate = 100;
        }
        else{
          tempSummoner.winRate = 0;
        }
        tempSummoners.push(tempSummoner);
      }

    }

    for(var sum in tempSummoners){
      tempSummoners[sum].kda[0] = +tempSummoners[sum].kda[0].toFixed(1);
      tempSummoners[sum].kda[1] = +tempSummoners[sum].kda[1].toFixed(1);
      tempSummoners[sum].kda[2] = +tempSummoners[sum].kda[2].toFixed(1);

      tempSummoners[sum].winRate = +tempSummoners[sum].winRate.toFixed(1);
    }

    tempChampSpecs.kill = +tempChampSpecs.kill.toFixed(1);
    tempChampSpecs.death = +tempChampSpecs.death.toFixed(1);
    tempChampSpecs.assist = +tempChampSpecs.assist.toFixed(1);

    tempChampSpecs.winRate = +tempChampSpecs.winRate.toFixed(1);
    tempChampSpecs.pickRate = +tempChampSpecs.pickRate.toFixed(1);


    return [tempChampSpecs, tempSummoners] as const

  }

  sortByFrequency(array : any[]) {
    let counter = array.reduce(
      (counter, key) => {
        counter[key] = 1 + counter[key] || 1;
        return counter
      }, {});

      let sorted_counter = Object.entries(counter).sort(
        (a:any, b:any) => b[1] - a[1]);


      let res = sorted_counter.map(x => x[0]);

      return res
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
