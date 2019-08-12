import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatProgressBarModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { EstudanteService } from '../services/estudante.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AgmCoreModule } from '@agm/core';
import {MatDialogModule} from '@angular/material/dialog';
import { ListaEstudanteComponent } from './lista-estudante/lista-estudante.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    FlexLayoutModule,
    ChartsModule,
    AgmCoreModule,
    MatDialogModule

  
  ],
  providers: [
    //{provide: OverlayContainer, useClass: FullscreenOverlayContainer},
    EstudanteService,
    AngularFirestore,
    
  ],
  declarations: [ DashboardComponent, 
   ListaEstudanteComponent,],
    entryComponents: [
    
    
      /*ContentElementDialogComponent,
      IFrameDialogComponent,
      JazzDialogComponent*/
    ],
  
})

export class DashboardModule {
  






}
