import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buttoncomp',
  templateUrl: './buttoncomp.component.html',
  styleUrls: ['./buttoncomp.component.css']
})
export class ButtoncompComponent implements OnInit {

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
