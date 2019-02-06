import { Component, OnInit,Input } from '@angular/core';
import { Session } from '../models/session';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  @Input() sessionInfo:Session;
  constructor() { }

  ngOnInit() {
  }

}
