import { Component, OnInit, ViewChild } from '@angular/core';
import { Estudante } from '../../classes/estudante';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { EstudanteService } from '../../services/estudante.service';
import { Encarregado } from '../../classes/encarregado';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Turma } from '../../classes/turma';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})

export class ListagemComponent implements OnInit {
  //private alunos:any []=[];
  estudantes: Estudante[];
  isLinear = true;
  
  //public paginaAtual = 1;
 // filter: any;
  //estudantesfilter: Estudante[];
  //firstFormGroup: FormGroup;
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
  data_emissao: Date;
  data_nascimento: Date;
  data_validade:Date;
  dataSourse: MatTableDataSource<Estudante>;
  displayedColumns = ['nome', 'turma', 'nivel', 'regime', 'contacto', 'Detalhe','Editar'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

firstFormGroup: FormGroup;
estudante: Estudante;
 
  constructor(  private _formBuilder: FormBuilder, public dialog: MatDialog,
     private estudanteService: EstudanteService,public snackBar: MatSnackBar) { 
    
  }
  ngOnInit() {
    
    this.estudanteService.getEstudantes().subscribe(data => {
      this.estudantes = data.map(e => {
        return {
          id: e.payload.doc.id,
          encarregado: e.payload.doc.data()['encarregado'] as Encarregado,
          turma: e.payload.doc.data()['turma'] as Turma,
          ...e.payload.doc.data(),
        } as Estudante;
      })
     // this.estudantesfilter=this.estudantes;

     this.dataSourse=new MatTableDataSource(this.estudantes.sort((a, b) => a.nome > b.nome ? 1 : -1));
      this.dataSourse.paginator = this.paginator;
    this.dataSourse.sort = this.sort;
      
      //console.log("ESTUDANTES: "+JSON.stringify(this.estudantes))
     // console.log("Encarregadao: "+this.estudantes[0].encarregado.nome)
    })

  }
 
  
  openSnackBar(mensagem) {
    /*this.snackBar.openFromComponent(null, {
    duration: 2000,
    announcementMessage: mensagem
    });*/
    this.snackBar.open(mensagem, null,{
      duration: 2000
    })
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourse.filter = filterValue;
  }

  //color = 'primary';
  //mode = 'Indeterminate';
 // value = 50;
 detalhes(aluno){
  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    width: '1000px',
    data: {datamatricula: aluno.datamatricula, nome: aluno.nome, genero: aluno.genero, documento: aluno.documento_identificacao,nacionalidade: aluno.nacionalidade,nr_documento: aluno.nr_documento,
      local_emissao: aluno.local_emissao,nome_encarregado: aluno.encarregado.nome,datanascimento: aluno.data_nascimento}
  });

 dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  // this.animal = result;
  
 });
 
  }  
  editar(aluno: Estudante){

  const dialogRef = this.dialog.open(DialogEditar, {
    width: '1000px',
    data:{estudante: aluno,data_validade:this.data_validade= new Date(), data_nascimento: this.data_nascimento=new Date(),data_emissao:this.data_emissao=new Date(),  generos: this.generos, provincias: this.provincias, documentos_identificacao: this.documentos_identificacao}
    //data: {estudante_nome: aluno.nome, genero: aluno.genero, documento: aluno.documento_identificacao,nacionalidade: aluno.nacionalidade,nr_documento: aluno.nr_documento,
    // local_emissao: aluno.local_emissao,nome_encarregado: aluno.encarregado.nome,datanascimento: aluno.data_nascimento}
  });
 dialogRef.afterClosed().subscribe(result => {
  
  console.log('The dialog was closed');
  
  // this.animal = result;
  
 });
 

  }
  
} 

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './detalhes.component.html',
})


export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  closeModal(){
 
    this.dialogRef.close();
  }
  
}


@Component({
  selector: 'dialog-editar',
  templateUrl: './editar.component.html',
})


export class DialogEditar{

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,
    private estudanteService: EstudanteService,public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogEditar>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    estudantes: Estudante[];
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  closeModal(){
 
    this.dialogRef.close();
  }
  GuardarDados(estudante){
    estudante.turma = Object.assign({},estudante.turma);
    estudante.encarregado = Object.assign({},estudante.encarregado);
    let data = Object.assign({}, estudante);
    this.estudanteService.updateEstudante(data);
      this.openSnackBar("Dados Guardados com sucesso");
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




