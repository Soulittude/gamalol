import { Component, OnInit , Input } from '@angular/core';
import { RiotApiService } from './../../../riot_api/riotApi.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

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

}
