import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cumba-button',
  templateUrl: './cumba-button.component.html',
  styleUrls: ['./cumba-button.component.css']
})
export class CumbaButtonComponent implements OnInit {

  constructor() { }
  // create a onClick output event
  @Output() onClick = new EventEmitter();

  @Input() type: string = 'primary';

  ngOnInit(): void {
  }

  onClickEvent() {
    this.onClick.emit();
  }
}

/*export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}*/
