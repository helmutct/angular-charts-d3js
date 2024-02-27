import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../common/pipes/pipes.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FacialComponent } from '../facial/facial-investigation.component';
import { FacialAlertsComponent } from '../facial/alerts/facial-investigation-alerts.component';
import { FacialAlertsViewDataComponent } from '../facial/view-data/facial-investigation-view-data.component';
import { FacialInvestigationCustomerComponent } from './customer/facial-investigation-customer.component';
import { FacialAlertsCustomerViewDataComponent } from './customer-view-data/facial-investigation-customer-view-data.component';
import { FacialWorkingComponent } from './working/facial-investigation-working.component';
import { ChatsModule } from '../../common/components/charts/chart.module';
import {ImageUploaderComponent} from '../../common/components/image-uploader/image-uploader.component'


export const routes = [
  { path: '', component: FacialComponent, pathMatch: 'full' },
  { path: 'analises', component: FacialWorkingComponent, data: { breadcrumb: 'ANALISAR ALERTAS' } },
  { path: 'analises/alertas', component: FacialAlertsComponent, data: { breadcrumb: 'ALERTAS' } },
  { path: 'analises/alertas/analisar', component: FacialAlertsViewDataComponent, data: { breadcrumb: 'VER ALERTA' } },
  { path: 'cliente', component: FacialInvestigationCustomerComponent, data: { breadcrumb: 'PROCEDIMENTOS' } },
  { path: 'cliente/analisar', component: FacialAlertsCustomerViewDataComponent, data: { breadcrumb: 'PROCEDIMENTOS - ANALISAR' } },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
    RouterModule.forChild(routes),
    LeafletModule.forRoot(),
    ChatsModule
  ],
  declarations: [
    FacialComponent,
    FacialAlertsComponent,
    FacialWorkingComponent,
    FacialAlertsViewDataComponent,
    FacialInvestigationCustomerComponent,
    FacialAlertsCustomerViewDataComponent,
    ImageUploaderComponent
  ]
})
export class FacialModule { }
