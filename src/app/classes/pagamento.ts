import { Estudante } from "./estudante";

export class Pagamento {
    estudante: Estudante;
    mes: string;
    propina: number;
    
    transporte?: number;
    alimentacao?: number;
    alimentacao_estudo_orientado?: number;
    //atraso
}
