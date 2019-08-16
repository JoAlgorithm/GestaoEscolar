import { Estudante } from "./estudante";
import { Data } from "@angular/router";

export class Turma {

    id: string;

    //Ano em que a turma estara em vigor
    //vai permitir filtrar as turmas ao matricular um aluno para determinado ano letivo
    //ex: 2019
    ano: number;

    nome: string; //nome da turma ex: Turma A
    mensalidade: number; //valor a pagar nessa turma
    
    //campo para segregar as turmas por niveis
    //ex: se for ESCOLINHA -> 2 anos , 3 anos, 4 anos
    //ex: se for SECUNDARIA -> 8a classe, 9a classe    
    nivel: string;

    //horario da turma
    //ex: se for ESCOLINHA -> Todo dia
    //ex: se for SECUNDARIA -> Diurno, Tarde, Noturno
    regime:string;

    estudantes?: Estudante[];
taxa_matricula?: number;
    //Limite de estudantes da turma
    limite: number;
    transporte: number;
    alimentacao: number;
    estudo_orientado: number;
    alimentacao_estudo_orientado: number;

    constructor(
        id?: string,
        ano?: number,
        nome?: string,
        mensalidade?: number,
        nivel?: string,
        regime?: string,
        estudantes?: Estudante[],
        limite?: number,
        transporte?: number,
        alimentacao?: number,
        estudo_orientado?: number,
        alimentacao_estudo_orientado?: number,
    ){
        this.id = id;
        this.ano = ano;
        this.nome = nome;
        this.mensalidade = mensalidade;
        this.nivel = nivel;
        this.regime = regime;
        this.estudantes = estudantes;
        this.limite = limite;
        this.transporte= transporte;
        this.alimentacao = alimentacao;
        this.estudo_orientado = estudo_orientado;
        this.alimentacao_estudo_orientado = alimentacao_estudo_orientado;
    }
}
