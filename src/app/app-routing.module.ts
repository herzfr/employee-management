import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: 'login', canLoad: [AuthGuard], loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: '**', pathMatch: 'full', redirectTo: '/login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
