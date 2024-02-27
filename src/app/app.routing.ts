import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ErrorComponent } from './pages/error/error.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './pages/tools/guard/auth.guard';


export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { breadcrumb: 'Dashboard' },
        canActivate: [AuthGuard]
      },
      {
        path: 'saude',
        loadChildren: () => import('./pages/health/health.module').then(m => m.HealthModule),
        data: { breadcrumb: 'Saúde' },
        canActivate: [AuthGuard]
      },
      {
        path: 'facial',
        loadChildren: () => import('./pages/facial/facial.module').then(m => m.FacialModule),
        data: { breadcrumb: 'Alertas de beneficiário' },
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: '**', component: ErrorComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,  // <- comment this line for enable lazy load
  // useHash: true
});
