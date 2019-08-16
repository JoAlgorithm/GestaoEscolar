export class Encarregado {
    nome: string;
    data_nascimento: Date;
    genero: string;

    documento_identificacao: string;
    nr_documento: string;
    nacionalidade: string;
    anexo_documento?: string;
    profissao?: string;
    local_trabalho?: string;
    telefone1: Number;
    telefone2?: Number; //Telefone alternativo
    email?: string;

    
}
