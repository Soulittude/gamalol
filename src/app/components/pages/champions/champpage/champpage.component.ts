import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-champpage',
  templateUrl: './champpage.component.html',
  styleUrls: ['./champpage.component.css']
})
export class ChamppageComponent implements OnInit {

  name?: string;
  private sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.name = params['name'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
