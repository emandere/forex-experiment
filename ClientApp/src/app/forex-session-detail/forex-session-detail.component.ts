import { Component, OnInit,Input } from '@angular/core';
import {ForexSession} from '../models/session';

@Component({
  selector: 'app-forex-session-detail',
  templateUrl: './forex-session-detail.component.html',
  styleUrls: ['./forex-session-detail.component.css']
})
export class ForexSessionDetailComponent implements OnInit {
  @Input() sessionInfo:ForexSession;
  constructor() { }

  ngOnInit() {
  }

}
