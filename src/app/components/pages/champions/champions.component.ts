import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChampionI, Data, Zed } from 'app/riot_api/model/champion.interface';
import { championsArr } from 'app/json/champions';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {

  constructor() { }

  imgUrlVersion: string = "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/";
  imgUrl: string = "https://ddragon.leagueoflegends.com/cdn/img/";

  championsArr = championsArr.data as Data;
  champions : Zed[] = [];

  async champGet()
  {
    var chAny = this.championsArr as any;

    for(var i in chAny)
    {
      this.champions.push(chAny[i]);
    }

  }

  @Input() championIcon!: string;

  ngOnInit(): void {
    this.champGet();
  }
}
