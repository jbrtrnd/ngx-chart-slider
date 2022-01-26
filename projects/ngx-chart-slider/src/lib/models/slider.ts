import { Subject } from 'rxjs';
import { Picker } from './picker';
import { Step, StepInterface } from './step';

export interface SliderInterface {
    range: boolean;
    steps: StepInterface[];
}

export class Slider implements SliderInterface {
    // Range slider
    range: boolean;
    // Steps
    steps: Step[];
    // Pickers
    pickers: Picker[];
    // Emitting when internal value changes
    onValueChange: Subject<any>;

    constructor(props: any) {
        // Range slider
        this.range = props.range || false;

        // Create Steps objects
        this.steps = props.steps.map((step: StepInterface, index: number) => {
            return new Step({...step, index, slider: this});
        });
        // Use a timeout to animate height
        setTimeout(() => {
            this.calculateStepsChartHeight();
        }, 350);

        // Create pickers
        this.pickers = [];
        this.pickers.push(new Picker({slider: this, step: this.steps[0]}));
        if (this.range) {
            this.pickers.push(new Picker({slider: this, step: this.steps[0]}));
        }

        // Set isInRange property
        this.applyInRangeSteps();

        // Create subject
        this.onValueChange = new Subject<any>();
        this.pickers.map(picker => {
            picker.onStepChange.subscribe((bubble: boolean) => {
                // For range slider, control that picker[0] is not > than picker[1]
                if (this.range) {
                    if (picker === this.pickers[0] && picker.getCurrentIndex() > this.pickers[1].getCurrentIndex()) {
                        picker.setStep(this.pickers[1].step, bubble);
                        return;
                    } else if (picker === this.pickers[1] && picker.getCurrentIndex() < this.pickers[0].getCurrentIndex()) {
                        picker.setStep(this.pickers[0].step, bubble);
                        return;
                    }
                }

                if (bubble) {
                    this.onValueChange.next(this.getValue());
                }

                this.applyInRangeSteps();
            })
        });
    }

    /**
     * Set value to slider
     *
     * @param value
     */
    setValue(value: any) {
        if (this.range && Array.isArray(value) && value.length === 2) {
            for (const idx of [0, 1]) {
                const step = this.retrieveStepFromValue(value[idx]);
                if (step) {
                    this.pickers[idx].setStep(step, false, false);
                } else {
                    this.pickers[idx].setStep(null, false, false);
                }
            }

            // Just control that everything is ok
            if (!this.pickers[0].step && this.pickers[1].step) {
                this.pickers[0].setStep(this.steps[0], false, false);
            } else if (this.pickers[0].step && !this.pickers[1].step) {
                this.pickers[1].setStep(this.steps[this.steps.length - 1], false, false);
            } else if (!this.pickers[0].step && !this.pickers[1].step) {
                this.pickers[0].setStep(this.steps[0], false, false);
                this.pickers[1].setStep(this.steps[0], false, false);
            }
        } else {
            const step = this.retrieveStepFromValue(value);
            if (step) {
                this.pickers[0].setStep(step, false);
            } else {
                this.pickers[0].setStep(this.steps[0], false);
            }
        }

        // Set isInRange property
        this.applyInRangeSteps();
    }

    /**
     * Get slider value
     */
    getValue() {
        if (this.range) {
            return [
                this.pickers[0].getCurrentValue(),
                this.pickers[1].getCurrentValue()
            ];
        } else {
            return this.pickers[0].getCurrentValue();
        }
    }

    /**
     * Set step to slider, will retrieve closest picker
     *
     * @param step
     */
    setStep(step: Step) {
        if (this.range) {
            const picker = step.retrieveClosestPicker();
            picker.setStep(step);
        } else {
            this.pickers[0].setStep(step);
        }
    }

    /**
     * Set isInRange property for each step
     *
     * @protected
     */
    protected applyInRangeSteps() {
        this.steps.map(step => {
            if (this.range) {
                step.isInRange = step.index >= this.pickers[0].getCurrentIndex() && step.index <= this.pickers[1].getCurrentIndex();
            } else {
                step.isInRange = this.pickers[0].step === step;
            }
        })
    }

    /**
     * Retrieve step according to a value
     *
     * @param value
     * @protected
     */
    protected retrieveStepFromValue(value: any): Step | undefined {
        return this.steps.find(step => step.value === value);
    }

    /**
     * Calculate chartHeight for each step, based on maximum value
     *
     * @protected
     */
    protected calculateStepsChartHeight() {
        const max = Math.max(...this.steps.map(step => step.chartData));
        this.steps.map(step => {
            step.chartHeight = (100 * step.chartData) / max;
        });
    }
}
