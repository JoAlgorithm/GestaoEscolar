import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Estudante} from './../../classes/estudante';
import { Encarregado } from '../../classes/encarregado';
import { CustomValidators } from 'ng2-validation';
//import { FileUploader } from 'ng2-file-upload';
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
import { EstudanteService } from './../../services/estudante.service';
import {MatSnackBar} from '@angular/material';
import { format } from 'url';
import {Router} from '@angular/router';
import * as jsPDF from 'jspdf';
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  public downloadPDF(){
let doc = new jsPDF;

let specialElementHandlers ={
'#editor': function(element,renderer){
  return true;
}

};
let content = this.content.nativeElement;
doc.fromHTML(content.innerHTML, 50, 20,{
'width':100,
'elementHandlers': specialElementHandlers

});
doc.save('Cadastro.pdf');

  }

  isLinear = true;
  estudante:  Estudante;
  encarregado: Encarregado;

  generos = [
    {value: 'Feminino', viewValue: 'Feminino'},
    {value: 'Masculino', viewValue: 'Masculino'}
  ];

  documentos_identificacao = [
    {value: 'BI', viewValue: 'Bilhete de identidade'},
    {value: 'Cedula', viewValue: 'Cedula'},
    {value: 'Passaporte', viewValue: 'Passaporte'},
    {value: 'Certidao de nascimento', viewValue: 'Certidao de nascimento'},
    {value: 'DIRE', viewValue: 'DIRE'},
    {value: 'Outros', viewValue: 'Outros'},
  ]

  nacionalidades = [
    {value: 'Mocambicana', viewValue: 'Mocambicana'},
    {value: 'Sul Africana', viewValue: 'Mocambicana'}
  ]

  provincias = [
    {value: 'Maputo', viewValue: 'Maputo'},
    {value: 'Gaza', viewValue: 'Gaza'},
    {value: 'Inhambane', viewValue: 'Inhambane'},
    {value: 'Sofala', viewValue: 'Sofala'},
    {value: 'Tete', viewValue: 'Tete'},
    {value: 'Quelimane', viewValue: 'Quelimane'},
    {value: 'Nampula', viewValue: 'Nampula'},
    {value: 'Cabo Delgado', viewValue: 'Cabo Delgado'},
    {value: 'Niassa', viewValue: 'Niassa'},
    {value: 'Zambezia', viewValue: 'Zambezia'}
  ]

  //uploader: FileUploader;
  //response: string;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private estudanteService: EstudanteService,
    public snackBar: MatSnackBar) {

    this.estudante = new Estudante();
    this.encarregado = new Encarregado();
   /* this.estudante.nome = ""
    this.estudante.genero = ""
    this.estudante.documento_identificacao = ""
    this.estudante.nr_documento = ""
    this.estudante.local_emissao = ""
    this.estudante.nacionalidade = ""
    this.estudante.provincia = ""
    this.estudante.cidade = ""
    this.estudante.endereco = ""
    this.estudante.data_nascimento = new Date();
    this.estudante.data_validade = new Date();
    this.estudante.data_emissao = new Date();
    this.estudante.nr_estudante = "";
    //this.estudante.escola = this.user.esco
    
   
    this.encarregado.telefone1 = 258;

    

    this.encarregado.nome = ""
    this.encarregado.genero = ""
    this.encarregado.nacionalidade = ""
    this.encarregado.telefone1 = 258
    this.encarregado.email = ""
    this.encarregado.nr_documento = ""
    this.encarregado.data_nascimento = new Date();
    this.encarregado.documento_identificacao = "";
    this.encarregado.telefone2 = 258848059711

    //this.encarregado. = ""

    /*this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.response = '';

    this.uploader.response.subscribe( res => this.response = res );*/
   }
   
  ngOnInit() {
    
    

    this.firstFormGroup = this._formBuilder.group({
      estudante_nome: ['', Validators.required],
      estudante_data_nascimento: ['', Validators.required],
      estudante_genero: ['', Validators.required],
      estudante_documento_identificacao: ['', Validators.required],
      estudante_nr_documento: ['', Validators.required],
      estudante_nacionalidade: ['', Validators.required],
      //estudante_foto: []
      estudante_provincia: ['', Validators.required],
      estudante_cidade: ['', Validators.required],
      estudante_endereco: ['', Validators.required],
      estudante_local_emissao: ['', Validators.required],
      estudante_data_emissao: ['', Validators.required],
      estudante_data_validade: ['']
    });
    
    this.secondFormGroup = this._formBuilder.group({
      encarregado_nome: ['', Validators.required],
    
      encarregado_genero: ['', Validators.required],
      encarregado_profissao: ['', Validators.required],
      encarregado_local_trabalho: ['', Validators.required],
      encarregado_nacionalidade: ['', Validators.required],
      encarregado_telefone1: ['',Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12)])],
      encarregado_telefone2: ['',Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12)])],
      encarregado_email: ['']
    });

    /*this.estudanteService.getEstudante().subscribe(data => {
      this.estudantes = data.map(e => {
        return {
         nr_estudante: e.payload.doc.id,
         nome: e.payload.doc.data()
        } as Estudante;
      })
    });*/
  }
  estudantes: Estudante[];

  registarEstudante(){
    //let data = Object.assign({}, this.firstFormGroup.value);

    //this.estudante.id = "2343"
    this.estudante.anexo_documento = "";
    this.estudante.alimentacao_checked = false;
    this.estudante.estudo_orientado_checked = false;
    this.estudante.transporte_checked = false;
    this.estudante.encarregado = Object.assign({}, this.encarregado);
    let data = Object.assign({}, this.estudante);

    this.estudanteService.createEstudante(data)
    .then( res => {
      this.openSnackBar("Estudante cadastrado com sucesso");
    }).catch( err => {
      console.log("ERRO: " + err.message)
    });


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