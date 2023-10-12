import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-comp/dashboard.component';
import { EventCrudComponent } from './dashboard-comp/event-crud/event-crud.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { RegisterOrganizerComponent } from './register-organizer/register-organizer.component';


const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent 
  },
  {
    path: 'event-crud/:id',
    component: EventCrudComponent
  },
  {
    path: 'create-event',
    component: CreateEventComponent
  },
  {
    path: 'register-organizer',
    component: RegisterOrganizerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}