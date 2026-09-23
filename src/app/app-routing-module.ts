import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthComponent } from './auth.component';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthComponent, data: { mode: 'login' } },
  { path: 'signup', component: AuthComponent, data: { mode: 'signup' } },
  { path: 'orders', component: OrdersComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
