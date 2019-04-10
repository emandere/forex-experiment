import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-us-map',
  templateUrl: './show-us-map.component.html',
  styleUrls: ['./show-us-map.component.css']
})
export class ShowUsMapComponent implements OnInit {

  constructor() { }

  usMapClick($event)
  {
      console.log($event);     
  }

  ngOnInit() {
  }

}
