import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './events/event/event.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', 
    component: EventsComponent 
  },
  {
    path: 'details/:id',
    component: EventComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}