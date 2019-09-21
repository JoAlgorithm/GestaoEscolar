import { Encarregado } from "./encarregado";
import { Turma } from "./turma";
import { Mensalidade } from "./mensalidade";

export class Estudante {

    id: string;

    //Chave primaria
    nr_estudante: string;

    nome: string;
    data_nascimento: Date;
    genero: string;

    documento_identificacao: string;
    nr_documento: string;
    local_emissao: string;
    data_emissao: Date;
    
    //Data d validade do documento de identificacao
    //Cedula nao contem data de validade
    data_validade?: Date; 

    nacionalidade: string;
    anexo_documento?: string;

    provincia: string;
    cidade: string;
    endereco: string;

    //escola: string;

    //True significa que o estudante esta ATIVO e false significa que estudante esta INATIVO
    //Por padrao o campo vira preenchido como true
    status: boolean; 
datamatricula?: Date;
    //Anexos
    foto?: string;  

    encarregado: Encarregado;
    
    mensalidades?: Mensalidade[];
    turma?: Turma; //A turma corrente do estudante persistida na ultima matricula
    transporte_checked?: boolean = false; //variavel que serve para verificar se estudante aderiu transporte
    alimentacao_checked?: boolean = false; //variavel que serve para verificar se estudante aderiu transporte
    estudo_orientado_checked?: boolean = false; //variavel que serve para verificar se estudante aderiu transporte
    alimentacao_estudo_orientado_checked?: boolean = false; 
    /*constructor(
        id?: string,
        nome?: string,
        data_nascimento?: Date,
        genero?: string,
        documento_identificacao?: string,
        nr_documento?: string,
        local_emissao?: string,
        data_emissao?: Date,
        data_validade?: Date,
        nacionalidade?: string,
        anexo_documento?: string,
        provincia?: string,
        cidade?: string,
        endereco?: string,
        escola?: string,
        status?: boolean,
        foto?: string,
        encarregado?: Encarregado,
        turma?: Turma
        ){ 
        this.id = id;
        this.nome = nome;
        this.data_nascimento = data_nascimento;
        this.genero = genero;
        this.documento_identificacao = documento_identificacao;
        this.nr_documento = nr_documento;
        this.local_emissao = local_emissao;
        this.data_emissao = data_emissao;
        this.data_validade = data_validade;
        this.nacionalidade = nacionalidade;
        this.anexo_documento = anexo_documento;
        this.provincia = provincia,
        this.cidade = cidade;
        this.endereco = endereco;
        this.escola = escola;
        this.status = status;
        this.foto = foto;
        this.encarregado = encarregado;
        this.turma = turma;
    }*/

}
