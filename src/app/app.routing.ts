import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';

export const AppRoutes: Routes = [{
  path: '',
  component: AuthLayoutComponent,
  children: [{
    //path: 'autenticacao',
    path: '',
    loadChildren: './autenticacao/autenticacao.module#AutenticacaoComponentsModule'
  },
  {
    path: 'session',
    loadChildren: './session/session.module#SessionModule'
  }]
},{
  path: '',
  component: AdminLayoutComponent,
  children: [{
    //path: '',
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'estudante',
    loadChildren: './estudante/estudante.module#EstudanteComponentsModule'
  }],
  
}, {
  path: '**',
  redirectTo: 'session/404'
}];
