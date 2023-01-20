import { Component, OnInit , Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiotApiService } from './../../../riot_api/riotApi.service';
import { championsArr } from './../../../json/champions';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { LeagueI } from 'app/riot_api/model/league.interface';
import { Observable, of } from "rxjs";
import { ChampionI, Data } from 'app/riot_api/model/champion.interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }],
})

export class HomepageComponent implements OnInit {

  constructor(
    private riotApiService: RiotApiService,
  ) { }

  sumNick = 'Coconut';
  sumServer = 'tr1';

  changed = false;

  async sumUpdate(nick: string, sv: string) {
    this.changed = true;
    this.sumNick = nick;
    this.sumServer = sv;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit()
  {

  }

}
