import { Routes } from '@angular/router';

import {CadastroComponent} from './cadastro/cadastro.component';
import { ListagemComponent } from './listagem/listagem.component';
import { MatriculaComponent } from './matricula/matricula.component';

//import {TABLE_DEMO_ROUTES} from './table/routes';

export const EstudanteRoutes: Routes = [
  {
    path: '',
    children: [
      {path: 'cadastro_estudante', component: CadastroComponent},
      {path: 'matricula_estudante', component: MatriculaComponent},
      {path: 'listagem_estudante', component: ListagemComponent}
    ]
  }
];
