import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ListaEstudanteComponent } from './lista-estudante/lista-estudante.component';

export const DashboardRoutes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent,
 children: [
   {path: 'lista_estudante', component: ListaEstudanteComponent}
 ]
}];

