
import { Component, OnInit, ViewChild } from '@angular/core';
import { Estudante } from '../../classes/estudante';
import { EstudanteService } from '../../services/estudante.service';
import { Encarregado } from '../../classes/encarregado';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Turma } from '../../classes/turma';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-lista-estudante',
  templateUrl: './lista-estudante.component.html',
  styleUrls: ['./lista-estudante.component.scss']
})
export class ListaEstudanteComponent implements OnInit {
  estudantes: Estudante[];
  dataSourse: MatTableDataSource<Estudante>;
  displayedColumns = ['nome', 'turma', 'nivel', 'regime', 'contacto', 'Detalhe','Editar'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

firstFormGroup: FormGroup;
estudante: Estudante;
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,
    private estudanteService: EstudanteService,public snackBar: MatSnackBar) { }

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
      this.dataSourse=new MatTableDataSource(this.estudantes.sort((a,b) => a.nome < b.nome ? -1: 1));
      this.dataSourse.paginator = this.paginator;
    this.dataSourse.sort = this.sort;
      
      //console.log("ESTUDANTES: "+JSON.stringify(this.estudantes))
     // console.log("Encarregadao: "+this.estudantes[0].encarregado.nome)
    })

  }
  lista_estudante(aluno){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '1000px',
      data: { taxa_matricula: aluno.turma.taxa_matricula, datamatricula: aluno.datamatricula, nome: aluno.nome, genero: aluno.genero, documento: aluno.documento_identificacao,nacionalidade: aluno.nacionalidade,nr_documento: aluno.nr_documento,
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