import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-purple-card',
  templateUrl: './purple-card.component.html',
  styleUrls: ['./purple-card.component.scss']
})
export class PurpleCardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;

  constructor() {}

  ngOnInit() {}
}
