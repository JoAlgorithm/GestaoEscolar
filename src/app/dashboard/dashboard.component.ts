import { Component } from '@angular/core';
import { EstudanteService } from '../services/estudante.service';
import { Estudante } from '../classes/estudante';
import { Turma } from '../classes/turma';
import { Mensalidade } from '../classes/mensalidade';
import { Encarregado } from '../classes/encarregado';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { OnInit, ViewChild } from '@angular/core';
@Component({
  //selector: 'app-dashboard',
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  estudantes: Estudante[];
  estudantesMatriculados: any[];
  estudantesMasculinos: any[];
  estudantesMascu: any = 0;
  estudantesFemininas: any =0;

  turmas: Turma[];
  turmasFilter: any[];
  naoMatriculdos:any =0 ;

  dataSourse: MatTableDataSource<Estudante>;
  displayedColumns = ['nome'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private estudanteService: EstudanteService ,public dialog: MatDialog,){
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
      this.dataSourse=new MatTableDataSource(this.estudantes);
      this.dataSourse.paginator = this.paginator;
    this.dataSourse.sort = this.sort;

      this.estudantesMatriculados = this.estudantes.filter(e => e.turma != null);
      this.naoMatriculdos = this.estudantes.length - this.estudantesMatriculados.length;

      this.estudantesMascu = this.estudantes.filter(e => e.genero == 'Masculino').length;
      this.estudantesFemininas = this.estudantes.length - this.estudantesMascu;
      console.log(this.estudantesMascu + " " + this.estudantesFemininas)


      this.pieChartData = [this.estudantesMascu, this.estudantesFemininas];
      
    })

    this.estudanteService.getTurmas().subscribe(data => {
      this.turmas = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Turma;
      })       
    })
  } 




  detalhes(aluno){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '1000px', 
      
     // data: {nome: aluno.nome}
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  } 
  
  turma(aluno){
    const dialogRef = this.dialog.open(Dialogturma, {
      width: '1000px',
     // data: {nome: aluno.nome}
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  } 
  matriculado(aluno){
    const dialogRef = this.dialog.open(Dialogmatriculado, {
      width: '1000px',
     // data: {nome: aluno.nome}
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }
  naomatriculado(aluno){
    const dialogRef = this.dialog.open(Dialognaomatriculado, {
      width: '1000px',
     // data: {nome: aluno.nome}
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }



 

  // Doughnut
  public pieChartColors: any[] = [{
    backgroundColor: ['#3f51b5','#f44336',  '#ffeb3b', '#4caf50', '#2196f']
  }];
  public pieOptions: any = Object.assign({
    responsive: true,
    legend: {
      display: false,
      position: 'bottom'
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  });
  public pieChartLabels: string[] = ['Masculino', 'Feminino'];
  public pieChartData = [this.estudantesMascu, this.estudantesFemininas];
  public pieChartType = 'pie';

  public barChatOptions: any ={

    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string [] =['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean=true;
  public barChartData: any[]=[
    {data: [65,59,80,81,56,55,40], label: 'Estudantes nao Pago'},
    {data: [28,48,40,19,86,27,90], label: 'Estudantes Pago'},

  ];
  public chartClicked(e:any): void{
    console.log(e);
  }
  public chartHovered(e:any): void{
    console.log(e);
  }
public randomize(): void{
  let data =[
    Math.round(Math.random() * 100),
    59,
    80,
    (Math.random() * 100),
    56,
    (Math.random() * 100),
    40
  ];
  let clone= JSON.parse(JSON.stringify(this.barChartData));
clone[0].data=data;
this.barChartData=clone;



}















  
}
@Component({
  selector: 'Dialogmatriculado',
  templateUrl: './matriculado.component.html',
})
export class Dialogmatriculado {
  estudantes: Estudante[];
  estudantesMatriculados: any[];
  estudantesMasculinos: any[];
  estudantesMascu: any = 0;
  estudantesFemininas: any =0;

  turmas: Turma[];
  turmasFilter: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Estudante>;
  displayedColumns = ['nome','turma','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

     
      this.estudanteService.getEstudantes().subscribe(data => {
        this.estudantes = data.map(e => {
          return {
            id: e.payload.doc.id,
           encarregado: e.payload.doc.data()['encarregado'] as Encarregado,
           turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Estudante;
        })
        this.dataSourse=new MatTableDataSource(this.estudantes.filter(e => e.turma != null).sort((a, b) => a.nome > b.nome ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
      this.dataSourse.sort = this.sort;
        
      })

    
}

}


@Component({
  selector: 'Dialognaomatriculado',
  templateUrl: './naomatriculado.component.html',
})
export class Dialognaomatriculado {
  estudantes: Estudante[];
  estudantesMatriculados: any[];
  estudantesMasculinos: any[];
  estudantesMascu: any = 0;
  estudantesFemininas: any =0;

  turmas: Turma[];
  turmasFilter: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Estudante>;
  displayedColumns = ['nome'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

     
      this.estudanteService.getEstudantes().subscribe(data => {
        this.estudantes = data.map(e => {
          return {
            id: e.payload.doc.id,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Estudante;
        })
        this.dataSourse=new MatTableDataSource(this.estudantes.filter(e => e.turma == null).sort((a, b) => a.nome > b.nome ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
      this.dataSourse.sort = this.sort;
        
      })

    
}

}




















@Component({
  selector: 'Dialogturma',
  templateUrl: './turma.component.html',
})
export class Dialogturma {
  estudantes: Estudante[];
  estudantesMatriculados: any[];
  estudantesMasculinos: any[];
  estudantesMascu: any = 0;
  estudantesFemininas: any =0;

  turmas: Turma[];
  turmasFilter: any[];
  naoMatriculdos:any =0 ;

  dataSourse: MatTableDataSource<Turma>;
  displayedColumns = ['classe','turma','regime'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

     
      this.estudanteService. getTurmas().subscribe(data => {
        this.turmas = data.map(e => {
          return {
            id: e.payload.doc.id,
      
            ...e.payload.doc.data(),
          } as Turma;
        })
        this.dataSourse=new MatTableDataSource(this.turmas.sort((a, b) => a.nome > b.nome ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
      this.dataSourse.sort = this.sort;
        
      })

    
}

}






export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './detalhes.component.html',
})


export class DialogOverviewExampleDialog {
  estudantes: Estudante[];
  estudantesMatriculados: any[];
  estudantesMasculinos: any[];
  estudantesMascu: any = 0;
  estudantesFemininas: any =0;

  turmas: Turma[];
  turmasFilter: any[];
  naoMatriculdos:any =0 ;

  dataSourse: MatTableDataSource<Estudante>;
  displayedColumns = ['nome','genero'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getEstudantes().subscribe(data => {
        this.estudantes = data.map(e => {
          return {
            id: e.payload.doc.id,
            encarregado: e.payload.doc.data()['encarregado'] as Encarregado,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Estudante;
        })
        this.dataSourse=new MatTableDataSource(this.estudantes.sort((a, b) => a.nome > b.nome ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
      this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  closeModal(){
 
    this.dialogRef.close();
  }
 
  
  
}


