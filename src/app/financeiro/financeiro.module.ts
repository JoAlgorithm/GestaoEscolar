import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import {FullscreenOverlayContainer, OverlayContainer} from '@angular/cdk/overlay';

import {CdkTableModule} from '@angular/cdk/table';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {ObserversModule} from '@angular/cdk/observers';
import {PortalModule} from '@angular/cdk/portal';
import { NgxPaginationModule } from 'ngx-pagination';
import {  DialogOverviewExampleDialog, dialog_naojaneiro} from './lista-mensalidades/lista-mensalidades.component';
import {dialog_mesfevereiro,dialog_abril,dialog_naoabril,dialog_marco,dialog_naomarco,dialog_naofevereiro,
  dialog_maio,   dialog_naomaio,  dialog_junho,   dialog_naojunho,  dialog_julho,   dialog_naojulho,

  dialog_agosto,   dialog_naoagosto,dialog_setembro,   dialog_naosetembro,dialog_outubro,  
   dialog_naooutubro, dialog_novembro,   dialog_naonovembro,dialog_dezembro,   dialog_naodezembro


} from './lista-mensalidades/lista-mensalidades.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatTableModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';

import { FinanceiroRoutes } from './financeiro.routing';

//import {AutocompleteDemoComponent} from './autocomplete/autocomplete-demo';
import {ListaMensalidadesComponent} from './lista-mensalidades/lista-mensalidades.component';
import { PagamentoMensalidadesComponent } from './pagamento-mensalidades/pagamento-mensalidades.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { EstudanteService } from '../services/estudante.service';
//import { from } from 'rxjs';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FinanceiroRoutes),
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTableModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatNativeDateModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    NgxPaginationModule ,
    //LayoutModule,
    //TableDemoModule,
    
    NgxDatatableModule,
    CdkTableModule,
    A11yModule,
    BidiModule,
    CdkAccordionModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,

  ],
  providers: [
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
    EstudanteService,
    AngularFirestore,
 
  ],
  declarations: [
    PagamentoMensalidadesComponent,
    ListaMensalidadesComponent,
    DialogOverviewExampleDialog,
    dialog_naojaneiro,
    dialog_mesfevereiro,
    dialog_naofevereiro,
    dialog_marco,
    dialog_naomarco,
    dialog_abril,
    dialog_naoabril,
    dialog_maio,  
     dialog_naomaio,
     dialog_junho,  
      dialog_naojunho, 
       dialog_julho,   
       dialog_naojulho,
       
  dialog_agosto,   dialog_naoagosto,dialog_setembro,   dialog_naosetembro,dialog_outubro,  
  dialog_naooutubro, dialog_novembro,   dialog_naonovembro,dialog_dezembro,   dialog_naodezembro


  ],
  entryComponents: [
    DialogOverviewExampleDialog, 
    dialog_naojaneiro,
    dialog_mesfevereiro,
    dialog_naofevereiro,
    dialog_marco,
    dialog_naomarco,
    dialog_abril,
    dialog_naoabril,
    dialog_maio, 
      dialog_naomaio,
      dialog_junho,   
      dialog_naojunho, 
       dialog_julho,  
        dialog_naojulho,
        
  dialog_agosto,   dialog_naoagosto,dialog_setembro,   dialog_naosetembro,dialog_outubro,  
  dialog_naooutubro, dialog_novembro,   dialog_naonovembro,dialog_dezembro,   dialog_naodezembro


  

  ]
})

export class FinanceiroComponentsModule {}
