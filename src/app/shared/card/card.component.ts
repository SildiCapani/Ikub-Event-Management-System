import { Component, Input } from '@angular/core';
import { calculateDaysLeft } from 'src/app/core/const/calculate-days';
import { Event, Events } from 'src/app/core/models/event';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent {

  @Input() events: Events[]

  constructor() {
    console.log(this.events)
  }

  calculateDaysLeftFunction = calculateDaysLeft

}
