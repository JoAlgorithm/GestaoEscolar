import { Estudante } from "./estudante";
import { Turma } from "./turma";

export class Mensalidade {
    
    estudante?: Estudante;
    turma?: Turma;
    ano:number; //ano para o qual a mensalidade foi paga
    mes:string; //mes para o qual a mensalidade foi paga
    data_pagamento: Date; //data de registo do pagamento no sistema
    multa: number;
}