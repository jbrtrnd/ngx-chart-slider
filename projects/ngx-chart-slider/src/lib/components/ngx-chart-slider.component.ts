import { Component, ElementRef, forwardRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Picker, Slider, SliderInterface, Step, StepInterface } from '../models';

@Component({
    selector: 'ngx-chart-slider',
    templateUrl: 'ngx-chart-slider.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgxChartSliderComponent),
        multi: true
    }]
})
export class NgxChartSliderComponent implements ControlValueAccessor, OnInit, OnChanges {
    // Steps
    @Input()
    steps: StepInterface[] = [];
    // Range slider
    @Input()
    range: boolean = false;
    // Display labels
    @Input()
    displayLabels: 'all' | 'none' | 'bounds';

    // Slider object
    slider: Slider;

    @ViewChild('container')
    container: ElementRef;

    // ControlValueAccessor functions
    onChange: any;
    onTouched: any;

    // Disabled state
    isDisabled: boolean;

    /**
     * Initialize component
     */
    ngOnInit(): void {
        this.createSlider();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('steps' in changes && !changes.steps.isFirstChange()) {
            const value = this.slider.getValue();
            this.createSlider();
            this.slider.setValue(value);

            if (JSON.stringify(value) !== JSON.stringify(this.slider.getValue())) {
                // Sorry for that, but it triggers Expression changed after view checked
                setTimeout(() => { this.onChange(this.slider.getValue()) });
            }
        }
    }

    /**
     * Create Slider object from component input's
     *
     * @protected
     */
    protected createSlider() {
        const config: SliderInterface = {
            steps: this.steps,
            range: this.range
        };

        this.slider = new Slider(config);
        this.slider.onValueChange.subscribe(value => {
            this.onChange(value);
        });
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(value: any): void {
        this.slider.setValue(value);

        if (!value && this.onChange && !this.isDisabled) {
            this.onChange(this.slider.getValue());
        }
    }

    onStepClick(step: Step) {
        if (!this.isDisabled) {
            this.slider.setStep(step);
        }
    }

    onPickerMouseDown(picker: Picker) {
        if (!this.isDisabled) {
            picker.isDragging = true;

            const rect = this.container.nativeElement.getBoundingClientRect();

            document.body.onmousemove = ($e) => {
                const step = this.findStepFromMouseEvent($e, rect);
                if (step && step !== picker.step) {
                    picker.setStep(step, false);
                }
            };

            document.body.onmouseup = () => {
                document.body.onmousemove = document.body.onmouseup = null;
                picker.isDragging = false;
                picker.emitEvent();
            };
        }
    }

    protected findStepFromMouseEvent($event: any, boundingClientRect: any) {
        const x = $event.clientX - boundingClientRect.left;
        const ratio = this.container.nativeElement.scrollWidth / this.slider.steps.length;
        const index = Math.floor(x / ratio);

        return this.slider.steps[index];
    }
}
