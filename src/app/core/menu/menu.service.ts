import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
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
      {state: 'cadastro_estudante', name: 'Cadastro'},
      {state: 'matricula_estudante', name: 'Matrícula'},
      {state: 'listagem_estudante', name: 'Lista'}
    ]
  },
  {
    state: 'financeiro',
    name: 'FINANÇAS',
    type: 'sub',
    icon: 'attach_money',
    children: [
      {state: 'pagamento_mensalidades', name: 'Registar pagamento'},
      {state: 'lista_mensalidades', name: 'Lista de pagamentos'}
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
