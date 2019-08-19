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
import {  DialogOverviewExampleDialog } from './dashboard.component';
import {  Dialogturma} from './dashboard.component';
import {  Dialogmatriculado} from './dashboard.component';
import {  Dialognaomatriculado} from './dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {    MatFormFieldModule } from '@angular/material';
import {
  MatAutocompleteModule,
  MatButtonToggleModule,
  
  MatCheckboxModule,
  MatChipsModule,
  MatTableModule,
  MatDatepickerModule,

  MatExpansionModule,
  MatGridListModule,
 
  MatInputModule,
 
  MatNativeDateModule,
  MatPaginatorModule,

  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';

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
    MatDialogModule,
    NgxPaginationModule ,
    NgxDatatableModule,
    MatButtonModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [
    //{provide: OverlayContainer, useClass: FullscreenOverlayContainer},
    EstudanteService,
    AngularFirestore,
    DialogOverviewExampleDialog,
    Dialogturma,
    Dialogmatriculado,
    Dialognaomatriculado
   

  ],
  declarations: [ DashboardComponent ,
    DialogOverviewExampleDialog,
    Dialogturma,
    Dialogmatriculado,
    Dialognaomatriculado
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    Dialogturma,
    Dialogmatriculado,
    Dialognaomatriculado,
  ],
})



export class DashboardModule {
  
}
