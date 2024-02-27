import { Component, ViewEncapsulation, Input, OnChanges, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'zr-stacked-vertical-bar',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./stacked-vertical-bar.component.scss'],
    templateUrl: './stacked-vertical-bar.component.html'
})
export class StackedVerticalBarComponent implements OnChanges {
    
    @Input() multi: any[];
    @Input() xAxisLabel: string;
    @Input() yAxisLabel: string;
    @Input() height = '400px';


    view: any[]  = undefined; // [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    legendTitle = 'Legenda';
    showXAxisLabel = true;
    showYAxisLabel = true;
    barPadding = 20;
    showDataLabel = false;
    animations = true;
    colorScheme = {
        domain: ['#A10A28', '#5AA454', '#C7B42C', '#AAAAAA']
    };
    constructor() {
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
