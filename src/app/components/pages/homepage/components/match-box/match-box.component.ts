import { Component, OnInit, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiotApiService } from '../../../../../riot_api/riotApi.service';
import * as spellsIf from '../../../../../riot_api/riotApi.spells.interface';
import { Summoner } from 'app/riot_api/model/summoner.interface';
import { ScoreDto } from 'app/riot_api/model/score.interface';

import { EventEmitter } from '@angular/core';
import { queueIdArr } from '../../../../../json/queueIds';
import { runeIdArr } from '../../../../../json/runeIds';
import { spellIdArr } from '../../../../../json/spellsId';
import { formatDate } from '@angular/common';
import { Data } from '@angular/router';
import { MatchDetailResponseI, Metadata, Participant } from 'app/riot_api/model/match.interface';
import { MajorRunesI, Rune, Slot } from 'app/riot_api/model/runes.interface';

@Component({
  selector: 'app-match-box',
  templateUrl: './match-box.component.html',
  styleUrls: ['./match-box.component.css']
})
export class MatchBoxComponent implements OnInit {

  match: MatchDetailResponseI = {};

  minSec : string = "";
  queueType: string = "Ranked";
  date : string = "01.01.2001";
  didWin: Boolean = false;

  particiler: Participant[] = [];
  blueTeam: Participant[] = [];
  redTeam: Participant[] = [];

  particiSum : Participant | undefined;

  priRuneIcon : string ="asd";
  secRuneIcon : string ="asd";
  priRuneTitle : string ="asd";
  secRuneTitle : string ="asd";

  spellDIcon : string = "asd";
  spellFIcon : string = "asd";
  spellDTitle : string = "asd";
  spellFTitle : string = "asd";

  itemsIcon : string[] = [];

  imgUrlVersion: string = "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/";
  imgUrl: string = "https://ddragon.leagueoflegends.com/cdn/img/";

  matchBoxLoaded : boolean = false;

  constructor(
    private riotApiService: RiotApiService,
  ) { }

  async matchDetailFind(summoner: Summoner, matchId: string) {
    const matchDetailGet = await this.riotApiService.getMatchDetail(summoner, matchId);

    if(matchDetailGet && matchDetailGet != "error")
    {
      this.match = matchDetailGet;
    }
    if (this.match.info?.participants && this.match.info?.gameDuration) {


      this.idToQueue(this.match.info.queueId);
      this.matchDuration(this.match.info.gameDuration);
      this.dateFormat(new Date(this.match.info.gameEndTimestamp));

      this.teams(this.match.metadata?.matchId as string, this.match.info.gameDuration, this.match.info.queueId, this.match.info.participants);
    }
  }

  async idToQueue(qid: number) {
    for (var q in queueIdArr)
    {
      if(queueIdArr[q].queueId == qid)
      {
        this.queueType = queueIdArr[q].description.replace(" games", "");
      }
    }
  }

  async matchDuration(time:number)
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

  async dateFormat(date: Date)
  {
    this.date = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }

  async teams(id_match : string, duration_match : number, queue_id : number, oyuncular:Participant[])
  {
    for(var oyuncu in oyuncular)
    {
      if(oyuncular[oyuncu].championName == 'FiddleSticks')
      {
        oyuncular[oyuncu].championName = 'Fiddlesticks';
      }

      if(oyuncular[oyuncu].summonerName == this.summonerObj.name)
      {
        this.particiSum = oyuncular[oyuncu];
      }

      var didwin = Number(oyuncular[oyuncu].win);

      const particiScore: ScoreDto = {
        champName: oyuncular[oyuncu].championName,
        kill: oyuncular[oyuncu].kills,
        death: oyuncular[oyuncu].deaths,
        assist: oyuncular[oyuncu].assists,
        farm: oyuncular[oyuncu].totalMinionsKilled + oyuncular[oyuncu].neutralMinionsKilled,
        gold: oyuncular[oyuncu].goldEarned,
        spells: [],
        items: [],
        runes: [],
        lane: oyuncular[oyuncu].lane,
        win: didwin,
        sumName: oyuncular[oyuncu].summonerName,
        matchId: id_match,
        matchDuration: duration_match
      }

      var condition = await this.riotApiService.checkScore(particiScore.matchId, particiScore.sumName);
      console.log(condition);
      if(queue_id == 420 && condition == false){
        this.riotApiService.postScore(particiScore);
      }

    }
    this.blueTeam = oyuncular.slice(0,5);
    this.redTeam = oyuncular.slice(5,10);

    if(this.particiSum)
    {
      this.sumFunc(this.particiSum);
    }
  }

  async sumFunc(sum : Participant)
  {
    if(sum.win == true)
    {
      this.didWin = true;
    }


    var rune1 = sum.perks.styles[0].selections[0].perk;
    var rune2 = sum.perks.styles[1].style;
    this.runesToUrl(rune1, rune2)

    var spell1 = sum?.summoner1Id;
    var spell2 = sum?.summoner2Id;
    this.spellsToUrl(spell1, spell2);

    this.getItems(sum);
  }

  async runesToUrl(rune1: number, rune2: number)
  {
    var majRunesArr = runeIdArr as MajorRunesI[];

    for(var i in majRunesArr)
    {
      var slotsArr = majRunesArr[i].slots as Slot[];
      var runesArr = slotsArr[0].runes as Rune[];

      if(majRunesArr[i].id == rune2)
      {
        this.secRuneIcon = this.imgUrl +  majRunesArr[i].icon;
        this.secRuneTitle = majRunesArr[i].name;
      }

      for(var k in runesArr)
      {
        if(runesArr[k].id==rune1)
        {
          this.priRuneIcon = this.imgUrl + runesArr[k].icon;
          this.priRuneTitle = runesArr[k].name;
        }
      }
    }
  }

  async spellsToUrl(spellId1 : number, spellId2 : number){

    var spellsObj = spellIdArr.data as any;

    for(var i in spellsObj)
    {
      if(spellsObj[i]['key'] == spellId1)
      {
        this.spellDIcon = this.imgUrlVersion + "spell/" + spellsObj[i]['image']['full'];
        this.spellDTitle = spellsObj[i].name;
      }
      if(spellsObj[i]['key'] == spellId2)
      {
        this.spellFIcon = this.imgUrlVersion + "spell/" + spellsObj[i]['image']['full'];
        this.spellFTitle = spellsObj[i].name;
      }
    }
  }

  async getItems(sum : Participant)
  {
    var iTemp = [];
    iTemp.push(this.imgUrlVersion + "item/" + (sum.item0.toString() as string) + ".png");
    iTemp.push(this.imgUrlVersion + "item/" + (sum.item1.toString() as string) + ".png");
    iTemp.push(this.imgUrlVersion + "item/" + (sum.item2.toString() as string) + ".png");
    iTemp.push(this.imgUrlVersion + "item/" + (sum.item3.toString() as string) + ".png");
    iTemp.push(this.imgUrlVersion + "item/" + (sum.item4.toString() as string) + ".png");
    iTemp.push(this.imgUrlVersion + "item/" + (sum.item5.toString() as string) + ".png");

    for(var item in iTemp)
    {
      if(iTemp[item] != this.imgUrlVersion + "item/0.png")
      {
        this.itemsIcon.push(iTemp[item]);
      }
    }
  }

  @Input() matchId!: string;
  @Input() summonerObj!: Summoner;

  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

  @Output() loaded = new EventEmitter<boolean>();

  loadedC() {
    this.loaded.emit(this.matchBoxLoaded);
  }

  ngAfterViewInit(): void {
    this.matchBoxLoaded = true;
  }


  ngOnInit(): void {
    this.matchDetailFind(this.summonerObj, this.matchId);

    this.matchBoxLoaded = true;
  }

}
