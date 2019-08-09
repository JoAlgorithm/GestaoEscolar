import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss']
})
export class MatriculaComponent implements OnInit {
  datatual= new Date();
  pagamentos: any []=[];
  @ViewChild('content') content: ElementRef;
  public downloadPDF(){
let doc = new jsPDF;

let specialElementHandlers ={
'#editor': function(element,renderer){
  return true;
}

};
let content = this.content.nativeElement;
doc.fromHTML(content.innerHTML,5, 20 , {
'width':1000,
'elementHandlers': specialElementHandlers

});

doc.save('Matricula.pdf');

  }

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

  regimes: string[] = ['Diurno', 'Noturno', 'Todo dia'];
  regime: string;

  niveis = new Set();
  nivel: any;

  color = 'primary';
  //transporte_checked = false;
  //alimentacao_checked = false;
  //estudo_orientado_checked = false;
  disabled = false;

  firstFormGroup: FormGroup;
  showActions: boolean = false;  
  
  constructor(private _formBuilder: FormBuilder, public snackBar: MatSnackBar,
    private estudanteService: EstudanteService, private authService: AuthService,
    ) { 
      this.estudante = new Estudante();
      this.estudante.transporte_checked = false;
      this.estudante.alimentacao_checked = false;
      this.estudante.estudo_orientado_checked = false;
      this.turma = new Turma();
      
    }

  /*filteredOptions: Observable<Estudante[]>;
  estudante = new FormControl();*/

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      ano: ['', Validators.required],
      estudante: ['', Validators.required],
      nivel: ['', Validators.required],
      regime: ['', Validators.required],
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
      //console.log("Encarregadao: "+this.estudantes[0].encarregado.nome)
    })

    this.estudanteService.getTurmas().subscribe(data => {
      this.turmas = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Turma;
      })
      this.turmas.forEach(element => {
        //if(this.niveis.indexOf(element) === -1) {
          this.niveis.add(element.nivel);
        //}
        
      });
       
    })

    this.user = this.authService.get_user;
  }

  filtrarTurma(ano, regime, nivel){
    this.turmasFilter = this.turmas.filter(e => e.ano == ano && e.regime == regime && e.nivel == nivel);
  }

  /*filtrarRegime(regime){
    this.turmasFilter = this.turmas.filter(e => e.regime == regime);
  }*/


  setEstudoOrientado(e){
    if(e.checked){
      this.estudante.estudo_orientado_checked = true;
    }else{
      this.estudante.estudo_orientado_checked = false;
    }
  }

  setAlimentacao(e){
    if(e.checked){
      this.estudante.alimentacao_checked = true;
    }else{
      this.estudante.alimentacao_checked = false;
    }
  }

  setTransporte(e){
    if(e.checked){
      this.estudante.transporte_checked = true;
    }else{
      this.estudante.transporte_checked = false;
    }
  }

  registar(){
    //matricula consiste em atualizar a turma do estudante e incluir o estudante na turma
    //na proxima matricula a turma do estudante é substituída e o historico das turmas dele ficam na turma

    this.estudante.turma = Object.assign({}, this.turma);
    let data = Object.assign({}, this.estudante);
    
    this.estudante.datamatricula = new Date();
    this.estudanteService.updateEstudante(data);
    this.estudanteService.addEstudanteTurma(this.turma.id, data)
    .then( res => {
      this.openSnackBar("Estudante Matriculado com sucesso");
      this.downloadPDF;
    }).catch( err => {
      console.log("ERRO: " + err.message) 
    });
    
    /*.then( res => {
      //this.openSnackBar("Estudante cadastrado com sucesso");
    }).catch( err => {
      console.log("ERRO: " + err.message)
    });*/

  }
  prencherpagamento(){
    let preco_alimentacao = 0;
    if (this.estudante.alimentacao_checked==true){
      preco_alimentacao =this.estudante.turma.alimentacao
    }
    let preco_transporte = 0;
    if (this.estudante.transporte_checked==true){
      preco_transporte =this.estudante.turma.transporte
    }
    let preco_estudo = 0;
    if (this.estudante.estudo_orientado_checked==true){
      preco_transporte =this.estudante.turma.estudo_orientado
    }

    this.pagamentos=[{ 
"descricao":"Matricula",
"valor":this.estudante.turma.taxa_matricula
    },
   { 
  "descricao":"Taxa de Alimentacao",
  "valor": preco_alimentacao
  
          },
   { 
   "descricao":"Taxa de Transporte",
   "valor":preco_transporte
       },
        
 { 
 "descricao":"Taxa de Estudo orientado",
 "valor":preco_estudo
   },
   { 
    "descricao":"Total",
    "valor":+this.estudante.turma.taxa_matricula+ +preco_alimentacao+ +preco_transporte+ +preco_estudo
      },

  ]

  }
  openSnackBar(mensagem) {
    /*this.snackBar.openFromComponent(null, {
    duration: 2000,
    announcementMessage: mensagem
    });*/
    this.snackBar.open(mensagem, null,{
      duration: 4000
     
    })
  }

}
