import { Component, ViewEncapsulation, Input, OnChanges, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'zr-bubble-chart',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./bubble-chart.component.scss'],
    templateUrl: './bubble-chart.component.html'
})
export class BubbleChartComponent implements OnChanges {

    @Input() data: any[];
    @Input() xAxisLabel: string;
    @Input() yAxisLabel: string;
    @Input() height = '400px';

    view: any[] = undefined; // [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    legendTitle = 'Legenda';
    showXAxisLabel = false;
    showYAxisLabel = true;
    barPadding = 28;
    roundDomains = false;
    roundEdges = false;
    showDataLabel = false;
    animations = true;

    colorScheme = {
        domain: ['#A10A28', '#5AA454', '#C7B42C', '#AAAAAA']
    };

    constructor(@Inject(DOCUMENT) private document) {

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
