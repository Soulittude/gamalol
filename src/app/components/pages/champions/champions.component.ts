import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {

  constructor() { }

  @Input() championIcon!: string; //burada message getireceğiz ama ileride bu MatchRespones olmalı.
                             // Bu vvriyi kullanıp, kart oluşturman lazım
  ngOnInit(): void {
  }

}
