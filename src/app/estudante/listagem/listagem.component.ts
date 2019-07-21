import { Component, OnInit, ViewChild } from '@angular/core';
import { Estudante } from '../../classes/estudante';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { EstudanteService } from '../../services/estudante.service';
import { Encarregado } from '../../classes/encarregado';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Turma } from '../../classes/turma';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';




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

  dataSourse: MatTableDataSource<Estudante>;
  displayedColumns = ['nome', 'turma', 'nivel', 'regime', 'contacto', 'Detalhe','Editar'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

firstFormGroup: FormGroup;

 
  constructor( private _formBuilder: FormBuilder, public dialog: MatDialog, private estudanteSevice: EstudanteService) { 
    
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nome: ['', Validators.required],
      
    });
    this.estudanteSevice.getEstudantes().subscribe(data => {
      this.estudantes = data.map(e => {
        return {
          id: e.payload.doc.id,
          encarregado: e.payload.doc.data()['encarregado'] as Encarregado,
          turma: e.payload.doc.data()['turma'] as Turma,
          ...e.payload.doc.data(),
        } as Estudante;
      })
     // this.estudantesfilter=this.estudantes;
      this.dataSourse=new MatTableDataSource(this.estudantes);
      this.dataSourse.paginator = this.paginator;
    this.dataSourse.sort = this.sort;
      
      //console.log("ESTUDANTES: "+JSON.stringify(this.estudantes))
     // console.log("Encarregadao: "+this.estudantes[0].encarregado.nome)
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
    width: '500px',
    data: {nome: aluno.nome, genero: aluno.genero, documento: aluno.documento_identificacao,nacionalidade: aluno.nacionalidade,nr_documento: aluno.nr_documento,
      local_emissao: aluno.local_emissao,nome_encarregado: aluno.encarregado.nome,datanascimento: aluno.data_nascimento}
  });

 dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  // this.animal = result;
  
 });
 
  }
  editar(aluno){
  const dialogRef = this.dialog.open(DialogEditar, {
    width: '1000px',
    data: {nome: aluno.nome, genero: aluno.genero, documento: aluno.documento_identificacao,nacionalidade: aluno.nacionalidade,nr_documento: aluno.nr_documento,
      local_emissao: aluno.local_emissao,nome_encarregado: aluno.encarregado.nome,datanascimento: aluno.data_nascimento}
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

  constructor(
    public dialogRef: MatDialogRef<DialogEditar>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  closeModal(){
 
    this.dialogRef.close();
  }
}




