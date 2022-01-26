import { Component, HostBinding, Input } from '@angular/core';
import { Step } from '../../models';

@Component({
    selector: 'ngx-chart-slider-step',
    templateUrl: 'step.component.html',
})
export class NgxChartSliderStepComponent {
    @Input()
    step: Step;

    @HostBinding('class.ngx-cs-hover')
    get isHover() {
        return this.step.isHover;
    }

    @HostBinding('class.ngx-cs-in-range')
    get isInRange() {
        return this.step.isInRange;
    }
}
