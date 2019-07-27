import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Estudante } from './../classes/estudante';
import { FormsModule } from "@angular/forms";
import { AuthService } from './auth.service';
import { Mensalidade } from '../classes/mensalidade';


@Injectable()
export class EstudanteService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }


  //METODOS RELACIONADOS A ENTIDADE ESTUDANTE

  //Retorna a lista de estudantes
  getEstudantes() {
    return this.firestore.collection('escolas/'+this.authService.get_escola_id + '/estudantes').snapshotChanges();
  }

  //Cadastra o estudante
  createEstudante(estudante: Estudante){
    return this.firestore.collection('escolas/'+this.authService.get_escola_id + '/estudantes').add(estudante);
  }

  updateEstudante(estudante: Estudante){
    //delete estudante.id;
    //alert('CAMINHO: escolas/'+this.authService.get_escola_id + '/estudantes/' + estudante.id)
    this.firestore.doc('escolas/'+this.authService.get_escola_id + '/estudantes/' + estudante.id).update(estudante);
  }

  deleteEstudante(estudante: Estudante){
    this.firestore.doc('escolas/'+this.authService.get_escola_id + '/estudantes/' + estudante.id).delete();
  }

  //METODOS RELACIONADOS A ENTIDADE TURMA

  //Retorna a lista de turmas
  getTurmas() {
    return this.firestore.collection('escolas/'+this.authService.get_escola_id + '/turmas').snapshotChanges();
  }

  //Adicionar estudante na turma
  addEstudanteTurma(turmaid, estudante:Estudante){
    return this.firestore.collection('escolas/'+ this.authService.get_escola_id + '/turmas/'+ turmaid +'/estudantes').add(estudante);
  }

  //METODOS RELACIONADOS A ENTIDADE MENSALIDADE
  /**
   * 
   * @param mensalidade: Mensalidade 
   * Essa função regista o pagamanto de mensalidade na tabela mensalidade; 
   * Regista a mesma informação na tabela de aluno para poder monstrar pagamentos por alunos; 
   * Regista a mesma informação na tabela de turmas para poder monstrar pagamentos por turmas
   */
  createMensalidade(mensalidade: Mensalidade){
    //A mensalidade alem de ser registada na tabela de mensalidades é tambem registada
    //alert('CAMINHO: escolas/'+this.authService.get_escola_id + '/estudantes/' + matricula.estudante.id + )
    
    //Registar a mensalidade na tabela de mensalidades
    console.log('caminho mensalidade: '+'escolas/'+this.authService.get_escola_id + '/mensalidade');
    this.firestore.collection('escolas/'+this.authService.get_escola_id + '/mensalidade').add(mensalidade);

    //Registar a mensalidade no estudante
   // console.log('caminho estudante: '+'escolas/'+this.authService.get_escola_id + '/estudantes/'+ mensalidade.estudante.id + '/mensalidades/');
   // this.firestore.collection('escolas/'+this.authService.get_escola_id + '/estudantes/'+ mensalidade.estudante.id + '/mensalidades/').add(mensalidade);
    

    //Registar a mensalidade na tabela de turmas
   // console.log('caminho turma: '+'escolas/'+this.authService.get_escola_id + '/turmas/'+ mensalidade.turma.id + '/mensalidades/');
   // this.firestore.collection('escolas/'+this.authService.get_escola_id + '/turmas/'+ mensalidade.turma.id + '/mensalidades/').add(mensalidade);  }
  }
}
