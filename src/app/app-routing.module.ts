import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'scan',
    loadChildren: () =>
      import('./pages/scan/scan.module').then((m) => m.ScanPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./pages/cliente/cliente.module').then((m) => m.ClientePageModule),
    canActivate: [AdminGuard]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
