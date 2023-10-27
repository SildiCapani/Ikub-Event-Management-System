import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-comp/dashboard.component';
import { EventCrudComponent } from './dashboard-comp/event-crud/event-crud.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { RegisterOrganizerComponent } from './register-organizer/register-organizer.component';
import { OrganizerGuard } from 'src/app/core/guards/organizer.guard';
import { AdminGuard } from 'src/app/core/guards/admin.guard';


const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent 
  },
  {
    path: 'event-crud/:id',
    canActivate: [OrganizerGuard],
    component: EventCrudComponent
  },
  {
    path: 'create-event',
    canActivate: [OrganizerGuard],
    component: CreateEventComponent
  },
  {
    path: 'register-organizer',
    canActivate: [AdminGuard],
    component: RegisterOrganizerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}