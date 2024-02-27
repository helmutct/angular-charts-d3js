import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'zr-historic-filters',
    templateUrl: './historic-filters.component.html',
    styleUrls: ['./historic-filters.component.scss']
})
export class HistoricFiltersComponent {

    classification = 0;
    providerName: string;

    @Output() onApplyFilters = new EventEmitter();

    constructor() {

    }

    applyFilter() {

    }
}
