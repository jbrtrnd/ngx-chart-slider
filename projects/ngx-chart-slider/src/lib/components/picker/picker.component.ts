import { Component, HostBinding, Input } from '@angular/core';
import { Picker } from '../../models';

@Component({
    selector: 'ngx-chart-slider-picker',
    templateUrl: 'picker.component.html',
})
export class NgxChartSliderPickerComponent {
    @Input()
    picker: Picker;

    @HostBinding('style.left')
    get left() {
        return this.picker.position + '%';
    }

    @HostBinding('class.ngx-cs-dragging')
    get isDragging() {
        return this.picker.isDragging;
    }
}
