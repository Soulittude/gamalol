import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { championI, Data, Zed } from 'app/riot_api/champion.interface';
import { championsArr } from 'app/json/champions';
import { Champion } from 'app/riot_api/riotaApi.interface';

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

  @Input() championIcon!: string; //burada message getireceğiz ama ileride bu MatchRespones olmalı.
                             // Bu vvriyi kullanıp, kart oluşturman lazım
  ngOnInit(): void {
    this.champGet();
  }

}
