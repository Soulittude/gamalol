import { Component, OnInit, Input, Output } from '@angular/core';
import { RiotApiService } from '../../../../../riot_api/riotApi.service';
import { MatchesResponse, MatchDetailResponse, Metadata, Summoner, Info, Participant, queueInterface, Perks, Selection, MajorRunes, Rune, Slot} from '../../../../../riot_api/riotaApi.interface';
import * as spellsIf from '../../../../../riot_api/riotApi.spells.interface';
import { EventEmitter } from '@angular/core';
import { queueIdArr } from '../../../../../json/queueIds';
import { runeIdArr } from '../../../../../json/runeIds';
import { spellIdArr } from '../../../../../json/spellsId';
import { formatDate } from '@angular/common';
import { Data } from '@angular/router';

@Component({
  selector: 'app-matchcont',
  templateUrl: './matchcont.component.html',
  styleUrls: ['./matchcont.component.css']
})
export class MatchcontComponent implements OnInit {

  match: MatchDetailResponse = {};

  minSec : string = "";
  queueType: string = "Ranked";
  date : string = "01-01-2001";
  didWin: Boolean = false;

  particiler: Participant[] = [];
  blueTeam: Participant[] = [];
  redTeam: Participant[] = [];

  particiSum : Participant | undefined;

  priRuneIcon : string ="asd";
  secRuneIcon : string ="asd";

  spellDIcon : string = "asd";
  spellFIcon : string = "asd";

  itemsIcon : string[] = [];

  imgUrlVersion: string = "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/";
  imgUrl: string = "https://ddragon.leagueoflegends.com/cdn/img/";

  constructor(
    private riotApiService: RiotApiService,
  ) { }

  async matchDetailFind(summoner: Summoner, matchId: string) {
    const matchDetailGet = await this.riotApiService.getMatchDetail(summoner, matchId);

    if(matchDetailGet)
    {
      this.match = matchDetailGet;
    }
    if (this.match.info?.participants && this.match.info?.gameDuration) {


      this.idToQueue(this.match.info.queueId);
      this.matchDuration(this.match.info.gameDuration);
      this.dateFormat(new Date(this.match.info.gameEndTimestamp));

      this.teams(this.match.info.participants);
    }
  }

  async idToQueue(qid: number) {
    for (var q in queueIdArr)
    {
      if(queueIdArr[q].queueId == qid)
      {
        this.queueType = queueIdArr[q].description;
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
    this.date = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  }

  async teams(oyuncular:Participant[])
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
    var majRunesArr = runeIdArr as MajorRunes[];

    for(var i in majRunesArr)
    {
      var slotsArr = majRunesArr[i].slots as Slot[];
      var runesArr = slotsArr[0].runes as Rune[];

      if(majRunesArr[i].id == rune2)
      {
        this.secRuneIcon = this.imgUrl +  majRunesArr[i].icon;
      }

      for(var k in runesArr)
      {
        if(runesArr[k].id==rune1)
        {
          this.priRuneIcon = this.imgUrl + runesArr[k].icon
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
        this.spellDIcon = this.imgUrlVersion + "spell/" + spellsObj[i]['image']['full']
      }
      if(spellsObj[i]['key'] == spellId2)
      {
        this.spellFIcon = this.imgUrlVersion + "spell/" + spellsObj[i]['image']['full']
      }
    }
  }

  async getItems(sum : Participant)
  {
    this.itemsIcon.push(this.imgUrlVersion + "item/" + (sum.item0.toString() as string) + ".png");
    this.itemsIcon.push(this.imgUrlVersion + "item/" + (sum.item1.toString() as string) + ".png");
    this.itemsIcon.push(this.imgUrlVersion + "item/" + (sum.item2.toString() as string) + ".png");
    this.itemsIcon.push(this.imgUrlVersion + "item/" + (sum.item3.toString() as string) + ".png");
    this.itemsIcon.push(this.imgUrlVersion + "item/" + (sum.item4.toString() as string) + ".png");
    this.itemsIcon.push(this.imgUrlVersion + "item/" + (sum.item5.toString() as string) + ".png");
  }

  @Input() matchId!: string;
  @Input() summonerObj!: Summoner;

  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

  ngOnInit(): void {
    this.matchDetailFind(this.summonerObj, this.matchId);
  }

}
