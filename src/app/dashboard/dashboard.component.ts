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



  mensalidades: Mensalidade[];

  janeiro: any = 0;
  naojaneiro: any = 0;
  fevereiro: any=0;
  naofevereiro: any=0;
  marco: any=0;
  naomarco: any=0;
  abril: any=0;
  naoabril: any=0;
  maio: any=0;
  naomaio: any=0;
  junho: any=0;
  naojunho: any=0;
  julho: any=0;
  naojulho: any=0;
  agosto: any=0;
  naoagosto: any=0;
  setembro: any=0;
  naosetembro: any=0;
  outubro: any=0;
 naooutubro: any=0;
  novembro: any=0;
  naonovembro: any=0;
  dezembro: any=0;
  naodezembro: any=0;

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
    
    this.estudanteService.getMensalidades().subscribe(data => {
      this.mensalidades = data.map(e => {
        return {
          id: e.payload.doc.id,
          estudante: e.payload.doc.data()['estudante'] as Estudante,
          turma: e.payload.doc.data()['turma'] as Turma,
          ...e.payload.doc.data(),
        } as Mensalidade;
      })
     
      this.dataSourse.paginator = this.paginator;
      this.dataSourse.sort = this.sort;
      this.janeiro = this.mensalidades.filter(e =>e.mes == "Janeiro").length;
      this.naojaneiro = this.mensalidades.filter(e => e.mes != "Janeiro").length;
      this.fevereiro = this.mensalidades.filter(e => e.mes == "Fevereiro").length;
      this.naofevereiro = this.mensalidades.filter(e => e.mes != "Fevereiro").length;
      this.marco = this.mensalidades.filter(e => e.mes == "Marco").length;
      this.naomarco = this.mensalidades.filter(e => e.mes != "Marco").length;
      this.abril = this.mensalidades.filter(e => e.mes == "Abril").length;
      this.naoabril = this.mensalidades.filter(e => e.mes != "Abril").length;
      this.maio = this.mensalidades.filter(e => e.mes == "Maio").length;
      this.naomaio = this.mensalidades.filter(e => e.mes != "Maio").length;
      this.junho = this.mensalidades.filter(e => e.mes == "Junho").length;
      this.naojunho = this.mensalidades.filter(e => e.mes != "Junho").length;
      this.julho = this.mensalidades.filter(e => e.mes == "Julho").length;
      this.naojulho = this.mensalidades.filter(e => e.mes != "Julho").length;
      this.agosto = this.mensalidades.filter(e => e.mes == "Agosto").length;
      this.naoagosto = this.mensalidades.filter(e => e.mes != "Agosto").length;
      this.setembro = this.mensalidades.filter(e => e.mes == "Setembro").length;
      this.naosetembro = this.mensalidades.filter(e => e.mes != "Setembro").length;
      this.outubro = this.mensalidades.filter(e => e.mes == "Outubro").length;
      this.naooutubro = this.mensalidades.filter(e => e.mes != "Outubro").length;
      this.novembro = this.mensalidades.filter(e => e.mes == "Novembro").length;
      this.naonovembro = this.mensalidades.filter(e => e.mes != "Novembro").length;
      this.dezembro = this.mensalidades.filter(e => e.mes == "Dezembro").length;
      this.naodezembro = this.mensalidades.filter(e => e.mes != "Dezembro").length;
      this.pieChartData1 = [this.janeiro,this.naojaneiro, this.fevereiro,this.naofevereiro,
        this.marco,this.naomarco,this.abril,this.naoabril,this.maio, this.naoabril,this.junho,
        this.naojunho,this.julho,this.naojulho,this.agosto,this.naoagosto,this.setembro,this.naosetembro,
        this.outubro,this.naooutubro,this.novembro,this.naonovembro,this.dezembro,this.naodezembro];
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



  


  // Doughnut
  public pieChartColors1: any[] = [{
    backgroundColor: ['#4caf50','#f44336', '#4caf50','#f44336','#4caf50','#f44336','#4caf50','#f44336',
    '#4caf50','#f44336','#4caf50','#f44336','#4caf50','#f44336','#4caf50','#f44336','#4caf50','#f44336',
    '#4caf50','#f44336','#4caf50','#f44336','#4caf50','#f44336',]
  }];
  public pieOptions1: any = Object.assign({
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
  public pieChartLabels1: string[] = ['Janeiro','', 'Fevereiro','','Março','',
  'Abril','','Maio','','Junho','','Julho','','Agosto','','Setembro','','Outubro','','Novembro','','Dezembro',''];
  public pieChartData1 = [this.janeiro,this.naojaneiro,this.fevereiro,this.naofevereiro,this.marco,this.naomarco,
    this.abril,this.naoabril,this.maio,this.naomaio,this.junho,this.naojunho,this.julho,this.naojulho,this.agosto,this.naoagosto,this.setembro,this.naosetembro,this.outubro,this.naooutubro,this.novembro,this.naonovembro,this.dezembro,this.naodezembro];
  public pieChartType1= 'bar';


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


