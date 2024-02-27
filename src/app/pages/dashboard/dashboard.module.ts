import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../common/directives/directives.module';
import { PipesModule } from '../../common/pipes/pipes.module';
import { DashboardComponent } from './dashboard.component';
import { SuspiciousProvidersComponent } from './suspicious-providers/suspicious-providers.component';
import { MostSuspiciousProvidersComponent } from './most-suspicious-providers/most-suspicious-providers.component';
import { CommonScamsComponent } from './common-scams/common-scams.component';
import { MostCommonScamsComponent } from './most-common-scams/most-common-scams.component';
import { ChatsModule } from '../../common/components/charts/chart.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'suspeitos', component: SuspiciousProvidersComponent, data: { breadcrumb: 'Prestadores suspeitos' } },
  { path: 'esquemas', component: CommonScamsComponent, data: { breadcrumb: 'Esquemas de fraude' } }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    PipesModule,
    RouterModule.forChild(routes),
    ChatsModule
  ],
  declarations: [
    DashboardComponent,
    SuspiciousProvidersComponent,
    MostSuspiciousProvidersComponent,
    CommonScamsComponent,
    MostCommonScamsComponent
  ]
})

export class DashboardModule { }
