import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { HomeComponent } from './dashboard/home/home.component';
import { WeatherComponent } from './dashboard/weather/weather.component';
import { NofoundComponent } from './dashboard/nofound/nofound.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component'),
      },
      {
        path: 'home',
        component:HomeComponent,
      },
      {
        path: 'weather/:id',
        component:WeatherComponent,
      },
      { path: 'nofound', component: NofoundComponent },
      { path: '**', component: NofoundComponent },

    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
