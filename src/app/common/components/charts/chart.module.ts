import { NgModule } from '@angular/core';
import {VerticalBarComponent} from './vertical-bar/vertical-bar.component';
import {CommonModule} from '@angular/common';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { StackedVerticalBarComponent } from './stacked-vertical-bar/stacked-vertical-bar.component';

@NgModule({
    imports: [
        CommonModule,
        NgxChartsModule
    ],
    declarations: [
        VerticalBarComponent,
        StackedVerticalBarComponent
    ],
    exports:[
        VerticalBarComponent,
        StackedVerticalBarComponent
    ]
})
export class ChatsModule {}
