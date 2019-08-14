import { Component } from '@angular/core';
import { EstudanteService } from '../services/estudante.service';
import { Estudante } from '../classes/estudante';
import { Turma } from '../classes/turma';
import { Encarregado } from '../classes/encarregado';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject} from '@angular/core';
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
  displayedColumns = ['nome', 'turma', 'nivel', 'regime', 'contacto', 'Detalhe','Editar'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
  

  constructor(private estudanteService: EstudanteService, public dialog: MatDialog){
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
      this.dataSourse=new MatTableDataSource(this.estudantes.sort((a,b) => a.nome < b.nome ? -1: 1));
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
  
  

  
}