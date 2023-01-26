import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { serverRankI } from 'app/riot_api/model/serverrank.interface';
import { RiotApiService } from 'app/riot_api/riotApi.service';

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./toplist.component.css']
})
export class ToplistComponent implements OnInit {

  constructor(
    private riotApiService: RiotApiService,
    ) { }

  server = "tr1"

  ngOnInit(): void {
    this.getRanks(this.server)
  }



  bestByLP : serverRankI[] = [];

  displayByLP: string[] = ['summonerName', 'leaguePoints', 'wins', 'losses'];


  async serverUpdate(sv: string) {
    this.server = sv;
  }

  async getRanks(server: string) {
    const ranksGet = await this.riotApiService.getRanks(server);
    console.log(ranksGet);
    if(ranksGet && ranksGet != "error")
    {
      this.bestByLP = ranksGet;
    }
  }
}
