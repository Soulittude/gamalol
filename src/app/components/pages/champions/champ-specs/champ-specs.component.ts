import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { champSpecs } from './champ-specs.interface';
import { Score } from 'app/riot_api/model/score.interface';
import { RiotApiService } from 'app/riot_api/riotApi.service';
import { champDataJ } from 'app/json/champData';
import { champDataJson } from 'app/json/champDataJson';
import { championsArr } from 'app/json/champions';
import { spellIdArr } from 'app/json/spellsId';
import { MajorRunesI, Rune, Slot } from 'app/riot_api/model/runes.interface';
import { runeIdArr } from 'app/json/runeIds';

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
    spells: [],
    runes: [],
    strongs: [],
    weaks: []
  }

  scores : Score[] = [];
  scoresMTDS : any;

  async getScores() {
    const scoresGet = await this.riotApiService.getScoresChamp(this.name as string);
    //const matchCount = await this.riotApiService.countAll();
    const allMatches = await this.riotApiService.getScores();

    if(scoresGet && scoresGet != "error")
    {
      this.scores = scoresGet;
      this.statsForChamps(this.scores);
    }

    if(allMatches && allMatches != "error")
    {
      this.allCount = allMatches.length;
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
      spells: [],
      runes: [],
      strongs: [],
      weaks: []
    };
    let champs = champDataJson.champions;

    const champ = Object.values(champs).find(x => x.name === this.name);
    if(champ)
    {
      tempChampSpecs.strongs = champ.hardChamps;
      tempChampSpecs.weaks = champ.easyChamps;
    }

    for(var score in scores)
    {

      tempChampSpecs.kill = ((tempChampSpecs.kill * tempChampSpecs.matchCount) + scores[score].kill) / (tempChampSpecs.matchCount + 1)
      tempChampSpecs.death = ((tempChampSpecs.death * tempChampSpecs.matchCount) + scores[score].death) / (tempChampSpecs.matchCount + 1)
      tempChampSpecs.assist = ((tempChampSpecs.assist * tempChampSpecs.matchCount) + scores[score].assist) / (tempChampSpecs.matchCount + 1)
      tempChampSpecs.matchCount += 1;
      tempChampSpecs.winRate = (tempChampSpecs.winCount/tempChampSpecs.matchCount) * 100;
      tempChampSpecs.pickRate = (tempChampSpecs.matchCount/this.allCount) * 100;

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

      console.log(tempChampSpecs.items)

      for(var i in scores[score].spells)
      {
        const spell = Object.values(tempChampSpecs.spells).find(x => x === i);
        if(!spell)
        {
          tempChampSpecs.spells.push(this.spellsMod(scores[score].spells[i]))
        }
      }

      console.log(tempChampSpecs.spells)


      for(var i in scores[score].runes)
      {
        const rune = Object.values(tempChampSpecs.runes).find(x => x === scores[score].runes[i]);
        if(!rune)
        {
          tempChampSpecs.runes.push(this.runesMod(scores[score].runes[i]));
        }
      }

      console.log(tempChampSpecs.runes)



      tempChampSpecs.runes = this.sortByFrequency(tempChampSpecs.runes)

    }

    var a = tempChampSpecs;
    this.champSpecs = a;
    return a

  }

  runesMod(rune1: string)
  {
    var majRunesArr = runeIdArr as MajorRunesI[];

    let rune = "";

    let temp = ""

    for(var i in majRunesArr)
    {
      var slotsArr = majRunesArr[i].slots as Slot[];

      if(majRunesArr[i].id.toString() == rune1)
      {
        rune = majRunesArr[i].key;
      }

    }
    return rune
  }

  sortByFrequency(array : any[]) {
    let counter = array.reduce(
      (counter, key) => {
        counter[key] = 1 + counter[key] || 1;
        return counter
      }, {});

      let sorted_counter = Object.entries(counter).sort((a:any, b:any) => b[1] - a[1]);
      console.log(sorted_counter);


      let res = sorted_counter.map(x => x[0]);
      console.log(sorted_counter.map(x => x[0]));

      return res
  }

  spellsMod(spellId1 : string){

    var spellsObj = spellIdArr.data as any;

    let spell  = "";

    for(var i in spellsObj)
    {
      if(spellsObj[i]['key'] == spellId1)
      {
        spell = spellsObj[i].name;
      }
    }
    return spell
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