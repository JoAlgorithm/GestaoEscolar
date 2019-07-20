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
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss']
})
export class MatriculaComponent implements OnInit {

  displayedColumns = ['position', 'name', 'weight', 'symbol'];

  estudantes: Estudante[];
  turmas: Turma[];
  turmasFilter: any[];
  ano: any;
  user:User;

  estudante: Estudante;
  turma: Turma;

  anos = [
    {value: new Date().getFullYear(), viewValue: new Date().getFullYear()},
    {value: new Date().getFullYear()+1, viewValue: new Date().getFullYear()+1}
  ]

  color = 'primary';
  transporte_checked = false;
  alimentacao_checked = false;
  estudo_orientado_checked = false;
  disabled = false;

  firstFormGroup: FormGroup;
  showActions: boolean = false;  
  
  constructor(private _formBuilder: FormBuilder, public snackBar: MatSnackBar,
    private estudanteService: EstudanteService, private authService: AuthService) { 
      this.estudante = new Estudante();
      this.turma = new Turma();
      
    }

  /*filteredOptions: Observable<Estudante[]>;
  estudante = new FormControl();*/

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      ano: ['', Validators.required],
      estudante: ['', Validators.required],
      turma: ['', Validators.required],
      transporte: ['']
    });

    this.estudanteService.getEstudantes().subscribe(data => {
      this.estudantes = data.map(e => {
        return {
          id: e.payload.doc.id,
          encarregado: e.payload.doc.data()['encarregado'] as Encarregado,
          ...e.payload.doc.data(),
        } as Estudante;
      })
      //console.log("ESTUDANTES: "+JSON.stringify(this.estudantes))
      console.log("Encarregadao: "+this.estudantes[0].encarregado.nome)
    })

    this.estudanteService.getTurmas().subscribe(data => {
      this.turmas = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Turma;
      })
    })

    this.user = this.authService.get_user;
  }

  filtrarTurma(ano){
    this.turmasFilter = this.turmas.filter(e => e.ano == ano);
  }

}
