import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-switch-card',
  templateUrl: './switch-card.component.html',
  styleUrls: ['./switch-card.component.scss']
})
export class SwitchCardComponent implements OnInit {
  @Input() type: string;
  @Input() color: string;

  periods = [
    {
      id: 0,
      label: 'Hoje',
      icon: 'event_available'
    },
    {
      id: 1,
      label: 'Esta Semana',
      icon: 'date_range'
    },
    {
      id: 2,
      label: 'Este Mês',
      icon: 'calendar_today'
    }
  ];
  period: any;
  hours = '8:25';
  value = 480.0;

  constructor() {}

  ngOnInit() {
    this.period = this.periods[0];
  }

  switch() {
    if (this.periods.indexOf(this.period) === 2) {
      this.period = this.periods[0];
    } else {
      this.period = this.periods[this.periods.indexOf(this.period) + 1];
    }
  }
}
