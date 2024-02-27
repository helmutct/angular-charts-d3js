import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../common/pipes/pipes.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Neo4jd3Component } from '../../common/components/charts/neo4jd3/neo4jd3.component';
import { HealthInvestigationComponent } from './investigation/health-investigation.component';
import { HealthInvestigationAlertsComponent } from './investigation/alerts/health-investigation-alerts.component';
import { HealthInvestigationViewDataComponent } from './investigation/view-data/view-data.component';
import { InvestigationCloseComponent } from './investigation/close/close.component';
import { HealthHistoricComponent } from './historic/historic.component';
import { HistoricFiltersComponent } from './historic/filters/historic-filters.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StackedHorizontalBarComponent } from '../../common/components/charts/stacked-horizontal-bar/stacked-horizontal-bar.component';
import { BubbleChartComponent } from '../../common/components/charts/bubble-chart/bubble-chart.component';

export const routes = [
  { path: '', redirectTo: 'investigacoes', pathMatch: 'full' },
  { path: 'investigacoes', component: HealthInvestigationComponent, data: { breadcrumb: 'Investigações' } },
  { path: 'investigacoes/alertas', component: HealthInvestigationAlertsComponent, data: { breadcrumb: 'Alertas' } },
  { path: 'investigacoes/dados', component: HealthInvestigationViewDataComponent, data: { breadcrumb: 'Dados' } },
  { path: 'historico', component: HealthHistoricComponent, data: { breadcrumb: 'Histórico' } }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
    NgxChartsModule,
    RouterModule.forChild(routes),
    LeafletModule.forRoot()
  ],
  declarations: [
    Neo4jd3Component,
    HealthInvestigationComponent,
    HealthInvestigationAlertsComponent,
    HealthInvestigationViewDataComponent,
    InvestigationCloseComponent,
    HealthHistoricComponent,
    HistoricFiltersComponent,
    StackedHorizontalBarComponent,
    BubbleChartComponent
  ]
})
export class HealthModule { }
