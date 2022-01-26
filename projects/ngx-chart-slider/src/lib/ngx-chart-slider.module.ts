import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    NgxChartSliderBarComponent,
    NgxChartSliderComponent,
    NgxChartSliderLabelComponent,
    NgxChartSliderLineComponent,
    NgxChartSliderPickerComponent,
    NgxChartSliderStepComponent
} from './components';

@NgModule({
    declarations: [
        NgxChartSliderComponent,
        NgxChartSliderPickerComponent,
        NgxChartSliderStepComponent,
        NgxChartSliderBarComponent,
        NgxChartSliderLineComponent,
        NgxChartSliderLabelComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NgxChartSliderComponent
    ]
})
export class NgxChartSliderModule {
}
