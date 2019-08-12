import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ListaEstudanteComponent } from './lista-estudante/lista-estudante.component';

export const DashboardRoutes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent,
 children: [
  {path: 'dashboard', component: ListaEstudanteComponent}
   {path: 'lista_estudante', component: ListaEstudanteComponent}
 ]
}];

