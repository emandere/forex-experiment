import { Component, OnInit,Input } from '@angular/core';
import { ForexSession } from '../models/session';

@Component({
  selector: 'app-forex-session',
  templateUrl: './forex-session.component.html',
  styleUrls: ['./forex-session.component.css']
})
export class ForexSessionComponent implements OnInit {
  @Input() sessionInfo:ForexSession;
  constructor() { }

  ngOnInit() {
   
  }

}
