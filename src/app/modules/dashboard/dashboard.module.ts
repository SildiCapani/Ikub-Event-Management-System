import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { EventCrudComponent } from './dashboard-comp/event-crud/event-crud.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { RegisterOrganizerComponent } from './register-organizer/register-organizer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    EventCrudComponent,
    CreateEventComponent,
    RegisterOrganizerComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    ToastrModule.forRoot()
  ],
  providers: [DatePipe]
})
export class DashboardModule { }
