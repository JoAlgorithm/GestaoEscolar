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
import {ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-pagamento-mensalidades',
  templateUrl: './pagamento-mensalidades.component.html',
  styleUrls: ['./pagamento-mensalidades.component.scss']
})
export class PagamentoMensalidadesComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @ViewChild('content1') content1: ElementRef;
  @ViewChild('content2') content2: ElementRef;
  @ViewChild('content3') content3: ElementRef;
  @ViewChild('content4') content4: ElementRef;
  @ViewChild('content5') content5: ElementRef;
  @ViewChild('content6') content6: ElementRef;
  @ViewChild('content7') content7: ElementRef;
  @ViewChild('content8') content8: ElementRef;
  @ViewChild('content9') content9: ElementRef;
  total=0;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  estudantes: Estudante[];
  turmas: Turma[];
  estudante: Estudante;
  turma: Turma;
  desabiltitar= true;
 mensalidade: Mensalidade;
 alimentacao_estudo_orientado_novo=0;
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
/*if (mes.value = this.mensalidades.mes) 

this.meses.value = af.database.object('/Mensalidade.mes', { preserveSnapshot: true });

this.meses.value.subscribe(snapshot => {
if(snapshot.exists()) {  
console.loh(meses.value)
} else {
 //object doesnt exist 
}*/

pagamentos: any []=[];
nomeEscola: any;
dataatual = new Date();

public downloadPDF(){

  let doc = new jsPDF({
    orientation: 'p',
    unit: 'px',
    format: 'a4',
    putOnlyUsedFonts:true,

   });
let nomepdf:String;
nomepdf = "Mensalidade "+ this.estudante.nome+" " + this.mensalidade.mes+" " + this.mensalidade.ano;

let specialElementHandlers ={
'#editor': function(element,renderer){
return true;
}};
let content = this.content.nativeElement;
let content1 = this.content1.nativeElement;
let content2 = this.content2.nativeElement;
let content3 = this.content3.nativeElement;
let content4 = this.content4.nativeElement;
let content5 = this.content5.nativeElement;
let content6 = this.content6.nativeElement;
let content7 = this.content7.nativeElement;
let content8 = this.content8.nativeElement;
let content9 = this.content9.nativeElement;
var img = new Image();
img.src ="../../../assets/images/file-13.jpeg"; 
doc.addImage(img, 'PNG', 200, 10,35, 35);
doc.addImage(img, 'PNG', 200, 290,35, 35);
  doc.setFont("Courier");
  doc.setFontStyle("normal"); 
  doc.setFontSize(12);
  doc.fromHTML(content.innerHTML, 150, 122,{
    'width':100,
    'elementHandlers': specialElementHandlers,
   
    });
    doc.fromHTML(content.innerHTML, 150, 382,{
      'width':100,
      'elementHandlers': specialElementHandlers,
     
      });
    doc.fromHTML(content1.innerHTML, 310, 102,{
      'width':100,
      'elementHandlers': specialElementHandlers,
     
      });
      doc.fromHTML(content1.innerHTML, 310, 362,{
        'width':100,
        'elementHandlers': specialElementHandlers,
       
        });
      doc.fromHTML(content2.innerHTML, 320, 139,{
        'width':100,
        'elementHandlers': specialElementHandlers,
       
        });
        doc.fromHTML(content2.innerHTML, 320, 395,{
          'width':100,
          'elementHandlers': specialElementHandlers,
         
          });
      doc.fromHTML(content3.innerHTML, 330, 122,{
        'width':100,
        'elementHandlers': specialElementHandlers,
       
        });
        doc.fromHTML(content3.innerHTML, 330, 382,{
          'width':100,
          'elementHandlers': specialElementHandlers,
         
          });
        doc.fromHTML(content4.innerHTML, 180, 139,{
          'width':100,
          'elementHandlers': specialElementHandlers,
         
          });
          doc.fromHTML(content4.innerHTML, 180, 395,{
            'width':100,
            'elementHandlers': specialElementHandlers,
           
            });
    doc.fromHTML(content5.innerHTML, 85, 139,{
      'width':100,
      'elementHandlers': specialElementHandlers,
     
      });
      doc.fromHTML(content5.innerHTML, 85, 395,{
        'width':100,
        'elementHandlers': specialElementHandlers,
       
        });
      doc.fromHTML(content6.innerHTML, 270, 174,{
        'width':100,
        'elementHandlers': specialElementHandlers,
       
        });
        doc.fromHTML(content6.innerHTML, 270, 424,{
          'width':100,
          'elementHandlers': specialElementHandlers,
         
          });
        doc.fromHTML(content7.innerHTML, 270, 184,{
          'width':100,
          'elementHandlers': specialElementHandlers,
         
          });
          doc.fromHTML(content7.innerHTML, 270, 434,{
            'width':100,
            'elementHandlers': specialElementHandlers,
           
            });
          doc.fromHTML(content8.innerHTML, 270, 194,{
            'width':100,
            'elementHandlers': specialElementHandlers,
           
            });
            doc.fromHTML(content8.innerHTML, 270, 444,{
              'width':100,
              'elementHandlers': specialElementHandlers,
             
              });
            doc.fromHTML(content9.innerHTML, 270, 204,{
              'width':100,
              'elementHandlers': specialElementHandlers,
             
              });
              doc.fromHTML(content9.innerHTML, 270, 454,{
                'width':100,
                'elementHandlers': specialElementHandlers,
               
                });
  doc.text("--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------",1,285);
doc.text("ESCOLA PRIMÁRIA COMPLETA NENÉ", 135, 60);
doc.text("ESCOLA PRIMÁRIA COMPLETA NENÉ", 135, 335);
    doc.text("Ensino Particular", 165, 75);
    doc.text("Ensino Particular", 165, 345);
    doc.text("Dados do Estudante:", 50, 115);
    doc.text("Dados do Estudante:", 50, 375);
    doc.text("Emitido no dia:", 230, 115);
    doc.text("Emitido no dia:", 230, 375);
    doc.text("PAGAMENTO DE MENSALIDADE", 150, 90);
    doc.text("PAGAMENTO DE MENSALIDADE", 150, 355);
   
    doc.text("Secretaria:", 70, 240);
    doc.text("Secretaria:", 70, 490);
    doc.text("______________________________", 30, 269);
    doc.text("______________________________", 30, 525);
   
    doc.text("Nome Do Estudante:", 50, 135);
    doc.text("Nome Do Estudante:", 50, 395);
    doc.text("Classe:", 50, 152);
    doc.text("Classe:", 50, 408);
    doc.text("Turma:", 150, 152);
    doc.text("Turma:", 150, 408);
    doc.text("Pagamento do Mês:", 230, 152);
    doc.text("Pagamento do Mês:", 230, 408);
    doc.text("Ano:", 310, 135);
    doc.text("Ano:", 310, 395);
    doc.text("Taxa de Mensalidade ", 100, 187);
    doc.text("Taxa de Mensalidade", 100, 437);
    doc.text(" Alimentação e Estudos Orientado", 55, 197);
    doc.text(" Alimentação e Estudos Orientado", 55, 447);
    doc.text("MZN", 295, 189);
    doc.text("MZN", 295, 199);
    doc.text("MZN", 295, 209);
    doc.text("MZN", 295, 219);
    doc.text("MZN", 295, 439);
    doc.text("MZN", 295, 449);
    doc.text("MZN", 295, 459);
    doc.text("MZN", 295, 469);
    doc.text("Multa", 100, 209);
    doc.text("Multa", 100, 459);
    doc.setFontStyle("bold");
    doc.text("Descrição", 110, 177);
    doc.text("Descrição", 110, 427);
      doc.text("Preço Unitário", 250, 177);
        doc.text("Preço Unitário", 250, 427);
    
      doc.text("Total:", 110, 217);
      doc.text("Total:", 110, 467);

    doc.rect ( 60, 170 , 170 , 20 ); 
   doc.rect (  60, 180 , 170 , 20 ); 
   doc.rect (  60, 190 , 170 , 20 ); 
   doc.rect ( 60 , 200 , 170 , 20 ); 
   doc.rect (  230, 170 , 170 , 20 ); 
   doc.rect (  230, 180 , 170 , 20 );
   doc.rect (  230, 190 , 170 , 20 );
   doc.rect (  230, 200 , 170 , 20 );
   doc.rect ( 60, 420 , 170 , 20 ); 
   doc.rect ( 60, 430 , 170 , 20 ); 
   doc.rect ( 60, 440 , 170 , 20 ); 
   doc.rect ( 60, 450 , 170 , 20 ); 
   doc.rect (  230, 420 , 170 , 20 ); 
   doc.rect (  230, 430 , 170 , 20 ); 
   doc.rect (  230, 440 , 170 , 20 ); 
   doc.rect (  230, 450 , 170 , 20 ); 
   doc.line(50, 120, 400, 120);
   doc.line(50, 380, 400, 380);
doc.save(nomepdf);

}
  
  constructor(private _formBuilder: FormBuilder, public snackBar: MatSnackBar,
    private estudanteService: EstudanteService, private authService: AuthService) { 
      this.estudante = new Estudante();
      this.turma = new Turma();
      this.estudante.turma=this.turma;
      this.mensalidade= new Mensalidade();
      this.mensalidade.multa=0;
    }

  ngOnInit() {
    this.nomeEscola = this.authService.get_escola_nome;
    this.firstFormGroup = this._formBuilder.group({
      ano: ['', Validators.required],
      estudante: ['', Validators.required],
      nivel: ['', Validators.required],
      regime: ['', Validators.required],
      turma: ['', Validators.required],
     // transporte: [''],
      mes: ['', Validators.required],
      multa: ['', Validators.required],
      mensalidade: ['', Validators.required],
      alimentacao_estudo_orientado: ['', Validators.required],

    });
    this.firstFormGroup.get('mensalidade').disable();
  //  this.firstFormGroup.get('transporte').disable();
    //this.firstFormGroup.get('alimentacao').disable();
  //  this.firstFormGroup.get('estudo_orientado').disable();
    this.firstFormGroup.get('alimentacao_estudo_orientado').disable();
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
    if(estudante.alimentacao_estudo_orientado_checked==false){
      estudante.turma.alimentacao_estudo_orientado=0;}
    }
  
  
  confirmar(){
   
    this.mensalidade.ano=this.estudante.turma.ano;
    this.mensalidade.data_pagamento= new Date();
   this.mensalidade.estudante = Object.assign({},this.estudante);
    this.mensalidade.turma= Object.assign({},this.estudante.turma);
    let data = Object.assign({}, this.mensalidade);
    this.estudanteService.createMensalidade(data)
      this.openSnackBar("Pagamento com sucesso");
      this.downloadPDF;
      

  }

  prencherpagamento(){
    this.pagamentos=[{ 
"descricao":"Mensalidade",
"valor":this.estudante.turma.mensalidade
    },
  // { 
 // "descricao":"Taxa de Alimentacao",
 // "valor":this.estudante.turma.alimentacao
 //         },
  // { 
 //  "descricao":"Taxa de Transporte",
 // "valor":this.estudante.turma.transporte
  //     },
        
 { 
 "descricao":"Taxa de Alimentacao e Estudo orientado",
 "valor":this.estudante.turma.alimentacao_estudo_orientado
   },
   { 
    "descricao":"Multa",
    "valor":this.mensalidade.multa
        },
        { 
          "descricao":"TOTAL",
          "valor":this.total= +this.mensalidade.multa + +this.estudante.turma.alimentacao_estudo_orientado + +this.estudante.turma.mensalidade
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
