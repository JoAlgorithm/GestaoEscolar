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
  alimentacao_estudo_orientado_novo=0;
  total=0;
  @ViewChild('content') content: ElementRef;
  @ViewChild('content1') content1: ElementRef;
  @ViewChild('content3') content3: ElementRef;
  @ViewChild('content4') content4: ElementRef;
  @ViewChild('content5') content5: ElementRef;
  @ViewChild('content6') content6: ElementRef;
  @ViewChild('content7') content7: ElementRef;
  @ViewChild('content8') content8: ElementRef;
    public downloadPDF(){
  let doc = new jsPDF({
    orientation: 'l',
    unit: 'px',
    format: 'a4',
    putOnlyUsedFonts:true,
    

   });
   let doc1 = new jsPDF();
  let specialElementHandlers ={
  '#editor': function(element,renderer){
    return true;
  }
  
  };
  let content = this.content.nativeElement;
  let content1 = this.content1.nativeElement;
  let content3 = this.content3.nativeElement;
  let content4 = this.content4.nativeElement;
  let content5 = this.content5.nativeElement;
  let content6 = this.content6.nativeElement;
  let content7= this.content7.nativeElement;
  let content8= this.content8.nativeElement;
  var img = new Image();
img.src ="../../../assets/images/file-13.jpeg"; 
doc.addImage(img, 'PNG', 260, 20,30, 30);
  doc.setFont("Courier");
  doc.setFontStyle("normal"); 
  doc.setFontSize(12);
  doc.fromHTML(content.innerHTML, 150, 123,{
    'width':100,
    'elementHandlers': specialElementHandlers,
   
    });
    doc.fromHTML(content3.innerHTML, 420, 123,{
      'width':100,
      'elementHandlers': specialElementHandlers,
     
      });
    doc.fromHTML(content1.innerHTML, 420, 102,{
      'width':100,
      'elementHandlers': specialElementHandlers,
     
      });
      doc.fromHTML(content4.innerHTML, 85, 152,{
        'width':100,
        'elementHandlers': specialElementHandlers,
       
        });
        doc.fromHTML(content5.innerHTML, 85, 137,{
          'width':100,
          'elementHandlers': specialElementHandlers,
         
          });
          doc.fromHTML(content6.innerHTML, 310, 184,{
            'width':100,
            'elementHandlers': specialElementHandlers,
           
            });
            doc.fromHTML(content7.innerHTML, 310, 194,{
              'width':100,
              'elementHandlers': specialElementHandlers,
             
              });
              doc.fromHTML(content8.innerHTML, 310, 204,{
                'width':100,
                'elementHandlers': specialElementHandlers,
               
                });
      
    doc.text("--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------",1, 300);
    doc.setTextColor(0, 0, 0);
    doc.text("ESCOLA PRIMÁRIA COMPLETA NENÉ", 200, 60);
    doc.text("Ensino Particular", 230, 75);
    doc.text("Recibo de Matricula", 224, 90);
    doc.text("Secretaria:", 70, 250);
    doc.text("Emitido no dia:", 335, 115);
    doc.text("__________________", 50, 270);
    doc.text("Dados do Estudante:", 50, 115);
    doc.text("Nome Do Estudante:", 50, 135);
    doc.text("Classe:", 50, 150);
    doc.text("Regime:", 50, 165);
    doc.text("Ano:", 400, 135);
    doc.text("Taxa de Matricula", 80, 197);
    doc.text("Serviços", 80, 207);
    doc.text("MZN", 335, 197);
    doc.text("MZN", 335, 207);
    doc.text("MZN", 335, 217);
    doc.setFontStyle("bold");
    doc.text("Descrição", 100, 187);
      doc.text("Preço Unitário", 300, 187);
    
      doc.text("Total:", 80, 217);
   doc.rect ( 50 , 180 , 200 , 20 ); 
   doc.rect (  50, 190 , 200 , 20 ); 
   doc.rect (  50, 200 , 200 , 20 ); 
   doc.rect (  250, 180 , 250 , 20 ); 
   doc.rect (  250, 190 , 250 , 20 );
   doc.rect (  250, 200 , 250 , 20 );
   doc.line(50, 120, 500, 120);
   doc.line(50, 175, 500, 175);
  
   
  doc.save('Matricula.pdf');
  

 
    


  }
  datatual= new Date();
  pagamentos: any []=[];
 
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
      this.estudante.alimentacao_estudo_orientado_checked= false;
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
    this.estudante.alimentacao_estudo_orientado_checked = false;
    console.log('gomiomit '+this.estudante.alimentacao_estudo_orientado_checked );
  }

  filtrarTurma(ano, regime, nivel){
    this.turmasFilter = this.turmas.filter(e => e.ano == ano && e.regime == regime && e.nivel == nivel);
  }

  /*filtrarRegime(regime){
    this.turmasFilter = this.turmas.filter(e => e.regime == regime);
  }*/
  setAlimentacao_estudoOrientado(e){
    if(e.checked){
      this.estudante.alimentacao_estudo_orientado_checked = true;
    }else{
      this.estudante.alimentacao_estudo_orientado_checked = false;
    }
  }

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
    this.estudante.datamatricula = new Date();
    let data = Object.assign({}, this.estudante);
    
    this.estudanteService.updateEstudante(data);
    this.estudanteService.addEstudanteTurma(this.turma.id, data)
    .then( res => {
      this.openSnackBar("Estudante Matriculado com sucesso");
     
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
    let preco_alimentacao_estudo_orientado = 0;
    this.alimentacao_estudo_orientado_novo=0;
    if (this.estudante.alimentacao_estudo_orientado_checked===true){
      preco_alimentacao_estudo_orientado =this.estudante.turma.alimentacao_estudo_orientado
     this.alimentacao_estudo_orientado_novo=preco_alimentacao_estudo_orientado
    }
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
 "descricao":"Taxa de Estudo orientado",
 "valor":preco_alimentacao_estudo_orientado
   },
   { 
    "descricao":"Total",
    "valor":this.total=+this.estudante.turma.taxa_matricula+ +preco_alimentacao_estudo_orientado
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
