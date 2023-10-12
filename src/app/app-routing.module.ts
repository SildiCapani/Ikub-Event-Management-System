import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/authentication/login/login.component';
import { RegisterComponent } from './core/authentication/register/register.component';
import { RoleGuard } from './core/guards/role.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: 'home', 
    loadChildren: () => import('./modules/home/home.module')
    .then((m) => m.HomeModule) 
  },
  {
    path: 'dashboard',
    canLoad: [RoleGuard],
    loadChildren: () => {
      return import('./modules/dashboard/dashboard.module').then(
        module => module.DashboardModule
      )
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
