import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Estudante } from './../classes/estudante';
import { FormsModule } from "@angular/forms";
import { AuthService } from './auth.service';


@Injectable()
export class EstudanteService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  //Retorna a lista de estudantes
  getEstudantes() {
    return this.firestore.collection('escolas/'+this.authService.get_escola_id + '/estudantes').snapshotChanges();
  }

  //Retorna a lista de turmas
  getTurmas() {
    return this.firestore.collection('escolas/'+this.authService.get_escola_id + '/turmas').snapshotChanges();
  }

  //Cadastra o estudante
  createEstudante(estudante: Estudante){
    
    return this.firestore.collection('escolas/'+this.authService.get_escola_id + '/estudantes').add(estudante);
  }

  updateEstudante(estudante: Estudante){
    delete estudante.nr_estudante;
    this.firestore.doc('escolas/'+this.authService.get_escola_id + '/estudantes/' + estudante.nr_estudante).update(estudante);
  }

  deleteEstudante(nr_estudante: string){
    this.firestore.doc('escolas/'+this.authService.get_escola_id + '/estudantes/' + nr_estudante).delete();
  }

}
