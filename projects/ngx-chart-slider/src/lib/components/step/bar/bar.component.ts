import { Component, Input } from '@angular/core';
import { Step } from '../../../models';

@Component({
    selector: 'ngx-chart-slider-bar',
    templateUrl: 'bar.component.html',
})
export class NgxChartSliderBarComponent {
    @Input()
    step: Step;
}
