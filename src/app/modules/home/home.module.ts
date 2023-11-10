import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './events/event/event.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatRippleModule } from '@angular/material/core';
import { CoreModule } from 'src/app/core/core.module';
import { UserComponent } from './user/user.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsService } from 'src/app/core/services/events.service';
import { HomeResolver } from '../home.resolver';
import { TranslateModule } from '@ngx-translate/core'
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
    declarations: [
        EventsComponent,
        EventComponent,
        UserComponent
    ],
    providers: [
        EventsService,
        HomeResolver
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatRippleModule,
        MatIconModule,
        TranslateModule,
        CoreModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class HomeModule { }
