import { Component, ViewEncapsulation, Input, OnChanges, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { multi } from './data';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'zr-stacked-horizontal-bar',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./stacked-horizontal-bar.component.scss'],
    templateUrl: './stacked-horizontal-bar.component.html'
})
export class StackedHorizontalBarComponent implements OnChanges {

    multi: any[];

    view: any[] = undefined; // [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    legendTitle = 'Legenda';
    showXAxisLabel = true;
    xAxisLabel = 'Probabilidade de ser uma anomalia (-1 Alta | 1 Baixa)';
    showYAxisLabel = false;
    yAxisLabel = 'Campo';
    barPadding = 28;

    colorScheme = {
        domain: ['#A10A28', '#5AA454', '#C7B42C', '#AAAAAA']
    };

    constructor() {
        this.multi = multi;
    }

    onSelect(event) {
        console.log(event);
    }

    ngOnChanges() {

    }

    onLegendLabelClick(entry) {
        console.log('Legend clicked', entry);
    }

    select(data) {
        console.log('Item clicked', data);
    }
}
