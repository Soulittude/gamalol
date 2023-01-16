import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import cheerio from 'cheerio';
import { empty } from 'cheerio/lib/api/manipulation';

@Component({
  selector: 'app-patches',
  templateUrl: './patches.component.html',
  styleUrls: ['./patches.component.css']
})
export class PatchesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getPatches();
  }

  count: number = 1;

  courses: any[] = [
    'laravel',
    'symfony',
    'angular',
    'react',
    'laravel1',
    'symfony1',
    'angular1',
    'react1',
    'laravel2',
    'symfony2',
    'angular2',
    'react2',
    'laravel3',
    'symfony3',
    'angular3',
    'react3',
    'laravel4',
    'symfony4',
    'angular4',
    'react4',
    'laravel5',
    'symfony5',
    'angular5',
    'react5',
  ];

  urlPatches = 'https://www.leagueoflegends.com/tr-tr/news/tags/patch-notes/';

  patchesUrls : any = [];


  async getPatches() {
    try {
      let response = await fetch(this.urlPatches, {
        method: "GET",
      });
      /*
      const asd = await (await axios.get(this.urlPatches,  {
        headers: {
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "tr",
          "Connection": "keep-alive",
          "Content-Length": 83,
          "content-type": "text/plain",
          "Host": "bam-cell.nr-data.net",
          "Origin": "https://www.leagueoflegends.com",
          "Referer": "https://www.leagueoflegends.com/",
          "sec-ch-ua": '"Not?A_Brand";v="8", "Chromium";v="108", "Microsoft Edge";v="108"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "Windows",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.46",
         }
      })).data;
      alert(html);
      const $ = cheerio.load(html);
      const patches = $(".style__List-sc-106zuld-2 jmoWwb > li");

      patches.each((i, elem) => {
        const url: any = $(elem)
        .find("a")
        .attr('href')

        this.patchesUrls.push(url);
        alert(url);
      });*/
    }
    catch (error) {
      alert(error)
      console.error(error);
    }
  }

}
