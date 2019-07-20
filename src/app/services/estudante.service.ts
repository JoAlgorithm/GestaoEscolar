import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Estudante } from './../classes/estudante';
import { FormsModule } from "@angular/forms";
import { AuthService } from './auth.service';


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
    alert('CAMINHO: escolas/'+this.authService.get_escola_id + '/estudantes/' + estudante.id)
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
  
}
