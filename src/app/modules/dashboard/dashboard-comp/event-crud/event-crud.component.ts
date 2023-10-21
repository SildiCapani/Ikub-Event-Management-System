import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/core/models/event';
import { EventsService } from 'src/app/core/services/events/events.service';

@Component({
  selector: 'app-event-crud',
  templateUrl: './event-crud.component.html',
  styleUrls: ['./event-crud.component.css']
})


export class EventCrudComponent implements OnInit {

  eventData: Event
  eventId: string;
  eventForm: FormGroup;
  constructor(private route: ActivatedRoute, private eventsService: EventsService, private toastr: ToastrService, private location: Location) {
    
    this.eventForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      date: new FormControl(new Date(), [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(1)]),
      lastDate: new FormControl(new Date(), Validators.required),
      maxAttenders: new FormControl(0, [Validators.required, Validators.min(50)]),
    })
  }

  onSubmit(): void {

    if(this.eventForm.valid){
      
      this.eventsService.updateEvent(this.eventId, this.eventForm.value)
    
    } else {
      this.toastr.error("Invalid Form pleas check your inputs", "Invalid Form")
    }
    
  }

  goBack(): void {
    this.location.back()
  }

  setFormValues() {
    if (this.eventData) {
      this.eventForm.patchValue({
        title: this.eventData.title,
        description: this.eventData.description,
        price: this.eventData.price,
        image: this.eventData.image,
        date: this.eventData.date,
        lastDate: this.eventData.lastDate,
        maxAttenders: this.eventData.maxAttenders
      });
    }
  }

  ngOnInit(): void {
      this.eventId = this.route.snapshot.paramMap.get('id');
      this.eventsService.getEventById(this.eventId).subscribe(data => {this.eventData = data; this.setFormValues()})
    }

}
