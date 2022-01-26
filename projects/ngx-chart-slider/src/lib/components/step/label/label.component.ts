import { Component, Input } from '@angular/core';
import { Step } from '../../../models';

@Component({
    selector: 'ngx-chart-slider-label',
    templateUrl: 'label.component.html',
})
export class NgxChartSliderLabelComponent {
    @Input()
    step: Step;
}
