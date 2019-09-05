import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Mensalidade } from '../../classes/mensalidade';
import {Pagamento } from '../../classes/pagamento';
import { EstudanteService } from '../../services/estudante.service';
import { Estudante } from '../../classes/estudante';
import { Turma } from '../../classes/turma';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject} from '@angular/core';

@Component({
  selector: 'app-lista-mensalidades',
  templateUrl: './lista-mensalidades.component.html',
  styleUrls: ['./lista-mensalidades.component.scss']
})
export class ListaMensalidadesComponent implements OnInit {
  estudantes: Estudante[];
  mensalidades: Mensalidade[];
  pagamento: Pagamento[];
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
  meses = new Set();
  mensalidadeFilter: any[];
  
  //Variaveis da tabela
  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['estudante', 'turma', 'mes', 'ano', 'mensalidade'];
  //displayedColumns = ['estudante', 'turma', 'mes', 'ano', 'mensalidade', 'transporte','aimentacao', 'estudo_orientado'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private estudanteService: EstudanteService, public dialog: MatDialog) { }

  ngOnInit() {
    this.estudanteService.getMensalidades().subscribe(data => {
      this.mensalidades = data.map(e =>  {
        return {
          id: e.payload.doc.id,
          turma: e.payload.doc.data()['turma'] as Turma,
          estudante: e.payload.doc.data()['estudante'] as Estudante,
          ...e.payload.doc.data(),
        } as Mensalidade;
      })
      
  
      this.dataSourse=new MatTableDataSource(this.mensalidades);
      this.dataSourse.paginator = this.paginator;
      this.dataSourse.sort = this.sort;
      this.janeiro = this.mensalidades.filter(e =>e.mes=="Janeiro");
      this.naojaneiro = this.mensalidades.filter(e => e.mes != "Janeiro");
      this.fevereiro = this.mensalidades.filter(e => e.mes == "Fevereiro");
      this.naofevereiro = this.mensalidades.filter(e => e.mes != "Fevereiro");
      this.marco = this.mensalidades.filter(e => e.mes == "Marco");
      this.naomarco = this.mensalidades.filter(e => e.mes != "Marco");
      this.abril = this.mensalidades.filter(e => e.mes == "Abril");
      this.naoabril = this.mensalidades.filter(e => e.mes != "Abril");
      this.maio = this.mensalidades.filter(e => e.mes == "Maio");
      this.naomaio = this.mensalidades.filter(e => e.mes != "Maio");
      this.junho = this.mensalidades.filter(e => e.mes == "Junho");
      this.naojunho = this.mensalidades.filter(e => e.mes != "Junho");
      this.julho = this.mensalidades.filter(e => e.mes == "Julho");
      this.naojulho = this.mensalidades.filter(e => e.mes != "Julho");
      this.agosto = this.mensalidades.filter(e => e.mes == "Agosto");
      this.naoagosto = this.mensalidades.filter(e => e.mes != "Agosto");
      this.setembro = this.mensalidades.filter(e => e.mes == "Setembro");
      this.naosetembro = this.mensalidades.filter(e => e.mes != "Setembro");
      this.outubro = this.mensalidades.filter(e => e.mes == "Outubro");
      this.naooutubro = this.mensalidades.filter(e => e.mes != "Outubro");
      this.novembro = this.mensalidades.filter(e => e.mes == "Novembro");
      this.naonovembro = this.mensalidades.filter(e => e.mes != "Novembro");
      this.dezembro = this.mensalidades.filter(e => e.mes == "Dezembro");
      this.naodezembro = this.mensalidades.filter(e => e.mes != "Dezembro");
     
      
    })
    
   
    
  }
 
 


  //Metodo para filtrar dados na tabela
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove espacos vazios
    filterValue = filterValue.toLowerCase(); // converte dados para letras minusculas
    this.dataSourse.filter = filterValue;
  }
  
  PagoJaneiro(aluno){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '1000px',
    
    data:{    }
    });
  
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  } 


  NaoPagoJaneiro(aluno){
    const dialogRef = this.dialog.open(dialog_naojaneiro, {
      width: '1000px',
    
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  } 
  
  PagoFevereiro(aluno){
    const dialogRef = this.dialog.open(dialog_mesfevereiro , {
      width: '1000px',
    
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }
  NaoPagoFevereiro(aluno){
    const dialogRef = this.dialog.open(dialog_naofevereiro , {
      width: '1000px',
    
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }  
  PagoMarco(aluno){
    const dialogRef = this.dialog.open(dialog_marco , {
      width: '1000px',
    
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }  
  NaoPagoMarco(aluno){
    const dialogRef = this.dialog.open(dialog_naomarco , {
      width: '1000px',
    
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }  
  PagoAbril(aluno){
    const dialogRef = this.dialog.open(dialog_abril , {
      width: '1000px',
    
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }  
  NaoPagoAbril(aluno){
    const dialogRef = this.dialog.open(dialog_naoabril , {
      width: '1000px',
    
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }  
  PagoMaio(aluno){
    const dialogRef = this.dialog.open(dialog_maio , {
      width: '1000px',
    
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }  

  NaoPagoMaio(aluno){
    const dialogRef = this.dialog.open(dialog_naomaio , {
      width: '1000px',
    
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }  

  PagoJunho(aluno){
    const dialogRef = this.dialog.open(dialog_junho , {
      width: '1000px',
    
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }  
  NaoPagoJunho(aluno){
    const dialogRef = this.dialog.open(dialog_naojunho , {
      width: '1000px',
    
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }  



  PagoJulho(aluno){
    const dialogRef = this.dialog.open(dialog_julho , {
      width: '1000px',
    
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }  

  NaoPagoJulho(aluno){
    const dialogRef = this.dialog.open(dialog_naojulho , {
      width: '1000px',
    
    });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
    
   });
   
  }  


  
PagoAgosto(aluno){
  const dialogRef = this.dialog.open(dialog_agosto , {
    width: '1000px',
  
  });
 
 dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  // this.animal = result;
  
 });
 
}  
NaoPagoAgosto(aluno){
  const dialogRef = this.dialog.open(dialog_naoagosto , {
    width: '1000px',
  
  });
 
 dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  // this.animal = result;
  
 });
 
}  

PagoOutubro(aluno){
  const dialogRef = this.dialog.open(dialog_outubro , {
    width: '1000px',
  
  });
 
 dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  // this.animal = result;
  
 });
 
}  
NaoPagoOutubro(aluno){
  const dialogRef = this.dialog.open(dialog_naooutubro , {
    width: '1000px',
  
  });
 
 dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  // this.animal = result;
  
 });
 
}  
PagoSetembro(aluno){
  const dialogRef = this.dialog.open(dialog_setembro , {
    width: '1000px',
  
  });
 
 dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  // this.animal = result;
  
 });
 
}  

NaoPagoSetembro(aluno){
  const dialogRef = this.dialog.open(dialog_naosetembro , {
    width: '1000px',
  
  });
 
 dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  // this.animal = result;
  
 });
 
}  

PagoNovembro(aluno){
  const dialogRef = this.dialog.open(dialog_novembro , {
    width: '1000px',
  
  });
 
 dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  // this.animal = result;
  
 });
 
}  

NaoPagoNovembro(aluno){
  const dialogRef = this.dialog.open(dialog_naonovembro , {
    width: '1000px',
  
  });
 
 dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  // this.animal = result;
  
 });
 
}  
PagoDezembro(aluno){
  const dialogRef = this.dialog.open(dialog_dezembro , {
    width: '1000px',
  
  });
 
 dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  // this.animal = result;
  
 });
 
}  
NaoPagoDezembro(aluno){
  const dialogRef = this.dialog.open(dialog_naodezembro , {
    width: '1000px',
  
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



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './lista_janeiro.component.html',
})


export class DialogOverviewExampleDialog {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];
  meses = new Set();

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
       
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes == "Janeiro").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}

@Component({
  selector: 'dialog-naojaneiro',
  templateUrl: './lista_janeiro.component.html',
})


export class dialog_naojaneiro {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes != "Janeiro").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}
@Component({
  selector: 'dialog-mesfevereiro',
  templateUrl: './lista_fevereiro.component.html',
})


export class dialog_mesfevereiro {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes == "Fevereiro").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}


@Component({
  selector: 'dialog-naofevereiro',
  templateUrl: './lista_naofevereiro.component.html',
})


export class dialog_naofevereiro {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes != "Fevereiro").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}




@Component({
  selector: 'dialog-marco',
  templateUrl: './lista_marco.component.html',
})


export class dialog_marco {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes == "Marco").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}

@Component({
  selector: 'dialog-naomarco',
  templateUrl: './lista_naomarco.component.html',
})


export class dialog_naomarco {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes != "Marco").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}




@Component({
  selector: 'dialog-abril',
  templateUrl: './lista_abril.component.html',
})


export class dialog_abril {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes == "Abril").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}

@Component({
  selector: 'dialog-naoabril',
  templateUrl: './lista_naoabril.component.html',
})


export class dialog_naoabril {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes != "Abril").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}


@Component({
  selector: 'dialog-maio',
  templateUrl: './lista_maio.component.html',
})


export class dialog_maio {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes == "Maio").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}

@Component({
  selector: 'dialog-naomaio',
  templateUrl: './lista_naomaio.component.html',
})


export class dialog_naomaio {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes != "Maio").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}

@Component({
  selector: 'dialog-junho',
  templateUrl: './lista_junho.component.html',
})


export class dialog_junho {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes == "Junho").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}

@Component({
  selector: 'dialog-naojunho',
  templateUrl: './lista_junho.component.html',
})


export class dialog_naojunho {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes != "Junho").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}

@Component({
  selector: 'dialog-julho',
  templateUrl: './lista_julho.component.html',
})


export class dialog_julho {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes == "Julho").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}


@Component({
  selector: 'dialog-naojulho',
  templateUrl: './lista_naojulho.component.html',
})


export class dialog_naojulho {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes != "Julho").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}




@Component({
  selector: 'dialog-agosto',
  templateUrl: './lista_agosto.component.html',
})


export class dialog_agosto {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes == "Agosto").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}


@Component({
  selector: 'dialog-naoagosto',
  templateUrl: './lista_naoagosto.component.html',
})


export class dialog_naoagosto {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes != "Agosto").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}
@Component({
  selector: 'dialog-setembro',
  templateUrl: './lista_setembro.component.html',
})


export class dialog_setembro {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes == "Setembro").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}


@Component({
  selector: 'dialog-naosetembro',
  templateUrl: './lista_naosetembro.component.html',
})


export class dialog_naosetembro {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes != "Setembro").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}


@Component({
  selector: 'dialog-outubro',
  templateUrl: './lista_outubro.component.html',
})


export class dialog_outubro {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes == "Outubro").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}


@Component({
  selector: 'dialog-naooutubro',
  templateUrl: './lista_naooutubro.component.html',
})


export class dialog_naooutubro {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes != "Outubro").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}

@Component({
  selector: 'dialog-novembro',
  templateUrl: './lista_novembro.component.html',
})


export class dialog_novembro {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes == "Novembro").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}



@Component({
  selector: 'dialog-naonovembro',
  templateUrl: './lista_naonovembro.component.html',
})


export class dialog_naonovembro {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes != "Novembro").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}



@Component({
  selector: 'dialog-dezembro',
  templateUrl: './lista_dezembro.component.html',
})


export class dialog_dezembro {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes == "Dezembro").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}



@Component({
  selector: 'dialog-naodezembro',
  templateUrl: './lista_naodezembro.component.html',
})


export class dialog_naodezembro {
  estudantes: Estudante[];
 
  turmas: Turma[];
  janeiro: any[];
  naoMatriculdos:any =0 ;
  mensalidades: Mensalidade[];

  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['nome','mes','ano'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private estudanteService: EstudanteService ,public dialog: MatDialog,) {

      this.estudanteService.getMensalidades().subscribe(data => {
        this.mensalidades = data.map(e => {
          return {
            id: e.payload.doc.id,
            estudante: e.payload.doc.data()['estudante'] as Estudante,
            turma: e.payload.doc.data()['turma'] as Turma,
            ...e.payload.doc.data(),
          } as Mensalidade;
        })
        this.dataSourse=new MatTableDataSource( this.mensalidades.filter(e => e.mes != "Dezembro").sort((a, b) => a.ano > b.ano ? 1 : -1));
        this.dataSourse.paginator = this.paginator;
        this.dataSourse.sort = this.sort;
        
      })


    
    }
   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
  
}
