import { Subject } from 'rxjs';
import { Slider } from './slider';
import { Step } from './step';

export interface PickerInterface {
    slider: Slider;
}

export class Picker implements PickerInterface {
    // Slider
    slider: Slider;
    // Current picked step
    step: Step|null;
    // Picker position from picked step (in percent)
    position: number = 0;
    //
    isDragging: boolean = false;
    // Emitting when internal value changes
    onStepChange: Subject<boolean>;

    constructor(props: any) {
        Object.assign(this, props);

        // Create subject
        this.onStepChange = new Subject<any>();

        // Calculate first position
        this.calculatePosition();
    }

    setStep(step: Step|null, bubbleEvent: boolean = true, emitEvent: boolean = true) {
        if (step !== this.step) {
            this.step = step;
            this.calculatePosition();

            if (emitEvent) {
                this.emitEvent(bubbleEvent);
            }
        }
    }

    getCurrentValue() {
        if (this.step) {
            return this.step.value;
        } else {
            return null;
        }
    }

    getCurrentIndex() {
        if (this.step) {
            return this.step.index;
        } else {
            return -1;
        }
    }

    emitEvent(bubbleEvent: boolean = true) {
        this.onStepChange.next(bubbleEvent);
    }

    protected calculatePosition() {
        const index = this.getCurrentIndex();

        if (index > -1) {
            const length = this.slider.steps.length;
            const range = 100 / length;
            this.position = (index * range + (range / 2));
        } else {
            this.position = 0;
        }
    }
}
