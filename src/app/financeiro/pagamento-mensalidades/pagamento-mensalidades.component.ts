import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { EstudanteService } from './../../services/estudante.service';
import { Estudante } from '../../classes/estudante';

import {Observable} from 'rxjs';
import { Turma } from '../../classes/turma';
import { Encarregado } from '../../classes/encarregado';
import { User } from '../../classes/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pagamento-mensalidades',
  templateUrl: './pagamento-mensalidades.component.html',
  styleUrls: ['./pagamento-mensalidades.component.scss']
})
export class PagamentoMensalidadesComponent implements OnInit {
  firstFormGroup: FormGroup;
  estudantes: Estudante[];
  turmas: Turma[];
  estudante: Estudante;
  turma: Turma;
  desabiltitar= true;
  mes: any;
  meses = [
    {value: 'Janeiro', viewValue: 'Janeiro'},
    {value: 'Fevereiro', viewValue: 'Fevereiro'},
    {value: 'Maio', viewValue: 'Maio'},
    {value: 'Abril', viewValue: 'Abril'},
    {value: 'Marco', viewValue: 'Marco'},
    {value: 'Junho', viewValue: 'Junho'},
    {value: 'Julho', viewValue: 'Julho'},
    {value: 'Agosto', viewValue: 'Agosto'},
    {value: 'Setembro', viewValue: 'Setembro'},
    {value: 'Outubro', viewValue: 'Outubro'},
    {value: 'Novembro', viewValue: 'Novembro'},
    {value: 'Dezembro', viewValue: 'Dezembro'}
  ]

  constructor(private _formBuilder: FormBuilder, public snackBar: MatSnackBar,
    private estudanteService: EstudanteService, private authService: AuthService) { 
      this.estudante = new Estudante();
      this.turma = new Turma();
      this.estudante.turma=this.turma;
    }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      ano: ['', Validators.required],
      estudante: ['', Validators.required],
      nivel: ['', Validators.required],
      regime: ['', Validators.required],
      turma: ['', Validators.required],
      transporte: [''],
      mes: ['', Validators.required],
    });
    this.firstFormGroup.get('regime').disable();
    this.firstFormGroup.get('turma').disable();
    this.firstFormGroup.get('nivel').disable();
    this.firstFormGroup.get('ano').disable();
    this.estudanteService.getEstudantes().subscribe(data => {
      this.estudantes = data.map(e => {
        return {
          id: e.payload.doc.id,
          encarregado: e.payload.doc.data()['encarregado'] as Encarregado,
          turma: e.payload.doc.data()['turma'] as Turma,
          ...e.payload.doc.data(),
        } as Estudante;
      }).filter(e => e.turma != null);
      
    })
    this.estudanteService.getTurmas().subscribe(data => {
      this.turmas = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Turma;
      })
     // this.turmas.forEach(element => {
        //if(this.niveis.indexOf(element) === -1) {
         // this.niveis.add(element.nivel);
        //}
        
     // });
       
    })
  }

}
