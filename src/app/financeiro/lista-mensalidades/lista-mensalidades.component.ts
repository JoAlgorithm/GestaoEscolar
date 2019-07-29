import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Mensalidade } from '../../classes/mensalidade';
import { EstudanteService } from '../../services/estudante.service';
import { Estudante } from '../../classes/estudante';
import { Turma } from '../../classes/turma';


@Component({
  selector: 'app-lista-mensalidades',
  templateUrl: './lista-mensalidades.component.html',
  styleUrls: ['./lista-mensalidades.component.scss']
})
export class ListaMensalidadesComponent implements OnInit {

  mensalidades: Mensalidade[];

  //Variaveis da tabela
  dataSourse: MatTableDataSource<Mensalidade>;
  displayedColumns = ['estudante', 'turma', 'mes', 'ano', 'mensalidade','alimentacao' ,'transporte'];
  //displayedColumns = ['estudante', 'turma', 'mes', 'ano', 'mensalidade', 'transporte','aimentacao', 'estudo_orientado'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private estudanteService: EstudanteService) { }

  ngOnInit() {
    this.estudanteService.getMensalidades().subscribe(data => {
      this.mensalidades = data.map(e => {
        return {
          id: e.payload.doc.id,
          estudante: e.payload.doc.data()['estudante'] as Estudante,
          turma: e.payload.doc.data()['turma'] as Turma,
          ...e.payload.doc.data(),
        } as Mensalidade;
      })
      this.dataSourse=new MatTableDataSource(this.mensalidades);
      this.dataSourse.paginator = this.paginator;
      this.dataSourse.sort = this.sort;
    })

    
  }

  //Metodo para filtrar dados na tabela
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove espacos vazios
    filterValue = filterValue.toLowerCase(); // converte dados para letras minusculas
    this.dataSourse.filter = filterValue;
  }

}
