import { Routes } from '@angular/router';

import {ListaMensalidadesComponent} from './lista-mensalidades/lista-mensalidades.component';
import { PagamentoMensalidadesComponent } from './pagamento-mensalidades/pagamento-mensalidades.component';

//import {TABLE_DEMO_ROUTES} from './table/routes';

export const FinanceiroRoutes: Routes = [
  {
    path: '',
    children: [
      {path: 'lista_mensalidades', component: ListaMensalidadesComponent},
      {path: 'pagamento_mensalidades', component: PagamentoMensalidadesComponent}
    ]
  }
];
