import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor() { }

  @Input() message!: string; //burada message getireceğiz ama ileride bu MatchRespones olmalı.
                             // Bu vvriyi kullanıp, kart oluşturman lazım
  ngOnInit(): void {
  }

}
