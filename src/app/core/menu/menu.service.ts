import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  icon: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS:Menu[] = [
  {
    state: 'dashboard',
    //state: 'home',
    name: 'INICIO',
    type: 'link',
    icon: 'home'
  },
  {
    state: 'estudante',
    name: 'ESTUDANTES',
    type: 'sub',
    icon: 'local_library',
    /*badge: [
      {type: 'red', value: '5'}
    ],*/
    children: [
      {state: 'cadastro_estudante',  name:'Cadastro',icon: 'group_add',
         },
      {state: 'matricula_estudante',name: 'Matrícula',icon: 'add'},
      {state: 'listagem_estudante',name: 'Lista',icon: 'contacts'}
    ]
  },
  {
    state: 'financeiro',
    name: 'FINANÇAS',
    type: 'sub',
    icon: 'monetization_on',
    children: [
      {state: 'pagamento_mensalidades',name: 'Mensalidade',icon: 'euro_symbol'},
      {state: 'lista_mensalidades',name: 'Relatório',icon: 'import_contacts'}
    ]
  }
  
  /*,
  {
    state: 'http://primer.nyasha.me/docs',
    name: 'DOCS',
    type: 'extTabLink',
    icon: 'local_library'
  }*/
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
