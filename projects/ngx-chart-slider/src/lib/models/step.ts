import { Picker } from './picker';
import { Slider } from './slider';

export interface StepInterface {
    label: string|number;
    value: any;
    chartData: number;
}

export class Step implements StepInterface {
    // Slider
    slider: Slider;
    // Label
    label: string;
    // Value
    value: any;
    // Index in slider
    index: number;

    // Chart data
    chartData: number = 0;
    // Chart data height in percent
    chartHeight: number = 0;

    // Hovering state
    isHover: boolean;
    // In range state
    isInRange: boolean

    constructor(props: any) {
        Object.assign(this, props);
    }

    retrieveClosestPicker(): Picker {
        let closest: any = null;

        for (const picker of this.slider.pickers) {
            if (closest === null) {
                closest = picker;
            } else if (Math.abs(this.index - picker.getCurrentIndex()) <= Math.abs(this.index - closest.getCurrentIndex())) {
                closest = picker;
            }
        }

        return closest;
    }
}
