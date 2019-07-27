import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { EstudanteService } from './../../services/estudante.service';
import { Estudante } from '../../classes/estudante';
import { MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs';
import { Turma } from '../../classes/turma';
import { Encarregado } from '../../classes/encarregado';
import { User } from '../../classes/user';
import { AuthService } from '../../services/auth.service';
import { Mensalidade } from '../../classes/mensalidade';

@Component({
  selector: 'app-pagamento-mensalidades',
  templateUrl: './pagamento-mensalidades.component.html',
  styleUrls: ['./pagamento-mensalidades.component.scss']
})
export class PagamentoMensalidadesComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  estudantes: Estudante[];
  turmas: Turma[];
  estudante: Estudante;
  turma: Turma;
  desabiltitar= true;
 mensalidade: Mensalidade;
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

pagamentos: any []=[];
  
  constructor(private _formBuilder: FormBuilder, public snackBar: MatSnackBar,
    private estudanteService: EstudanteService, private authService: AuthService) { 
      this.estudante = new Estudante();
      this.turma = new Turma();
      this.estudante.turma=this.turma;
      this.mensalidade= new Mensalidade();
      this.mensalidade.multa=0;
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
      multa: ['', Validators.required],
      mensalidade: ['', Validators.required],
      alimentacao: ['', Validators.required],
      estudo_orientado: ['', Validators.required],
    });
    this.firstFormGroup.get('mensalidade').disable();
    this.firstFormGroup.get('transporte').disable();
    this.firstFormGroup.get('alimentacao').disable();
    this.firstFormGroup.get('estudo_orientado').disable();
    this.firstFormGroup.get('regime').disable();
    this.firstFormGroup.get('turma').disable();
    this.firstFormGroup.get('nivel').disable();
    this.firstFormGroup.get('ano').disable();


    this.secondFormGroup = this._formBuilder.group({
     
    });
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
  verficarPagamentos(estudante){
if(estudante.transporte_checked==false){
estudante.turma.transporte=0;}
if(estudante.alimentacao_checked==false){
  estudante.turma.alimentacao=0;}
  if(estudante.estudo_orientado_checked==false){
    estudante.turma.estudo_orientado=0;}
  }
  confirmar(){
    this.mensalidade.ano=this.estudante.turma.ano;
    this.mensalidade.data_pagamento= new Date();
   this.mensalidade.estudante = Object.assign({},this.estudante);
    this.mensalidade.turma= Object.assign({},this.estudante.turma);
    let data = Object.assign({}, this.mensalidade);
    this.estudanteService.createMensalidade(data);
    
   

  }
  prencherpagamento(){
    this.pagamentos=[{ 
"descricao":"Mensalidade",
"valor":this.estudante.turma.mensalidade
    },
   { 
  "descricao":"Taxa de Alimentacao",
  "valor":this.estudante.turma.alimentacao
          },
   { 
   "descricao":"Taxa de Transporte",
   "valor":this.estudante.turma.transporte
       },
        
 { 
 "descricao":"Taxa de Estudo orientado",
 "valor":this.estudante.turma.estudo_orientado
   },
   { 
    "descricao":"Multa",
    "valor":this.mensalidade.multa
        },
        { 
          "descricao":"TOTAL",
          "valor": +this.mensalidade.multa + +this.estudante.turma.estudo_orientado + +this.estudante.turma.transporte + +this.estudante.turma.alimentacao + +this.estudante.turma.mensalidade
              },

    
  
  ]

  }

}
