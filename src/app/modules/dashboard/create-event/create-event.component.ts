import { DatePipe, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { EventCrudService } from 'src/app/core/services/event-crud.service';
import { EventsService } from 'src/app/core/services/events.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})


export class CreateEventComponent {

  eventForm: FormGroup;
  user: User = this.userService.user$.getValue()
  maxId: number;
  model: NgbDateStruct;
  selectedImage: File | null = null;

  constructor(private eventsService: EventCrudService, private userService: UserService, private datePipe: DatePipe, private location: Location) {

    this.eventForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      description: new FormControl('', [Validators.required, Validators.minLength(50)]),
      image: new FormControl('',),
      date: new FormControl(new Date(), [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(1)]),
      location: new FormControl('', Validators.required),
      lastDate: new FormControl(new Date(), Validators.required),
      maxAttenders: new FormControl(0, [Validators.required, Validators.min(50)]),
    })
  }

  getDateValue(value: any): string {
    return this.datePipe.transform(value, `yyyy-MM-dd`);
  }

  onImageSelected(event: any): void {
    const fileList: FileList = event.target.files;
    
    if (fileList.length > 0) {
      this.selectedImage = fileList[0];
    }
  }

  goBack(): void {
    this.location.back();
  }
  
  onSubmit(): void {

      const eventData = {
      creator: this.user.uid,
      date: this.getDateValue(this.eventForm.get('date').value),
      description: this.eventForm.get('description').value,
      lastDate: this.getDateValue(this.eventForm.get('lastDate').value),
      maxAttenders: this.eventForm.get('maxAttenders').value,
      location: this.eventForm.get('location').value,
      registeredAttenders: 0,
      namesOfRegisteredAttenders: { 0: ""},
      price: this.eventForm.get('price').value,
      title: this.eventForm.get('title').value
    }
    
    this.eventsService.createEvent(eventData, this.selectedImage)
  }
}
