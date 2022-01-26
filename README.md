# NgxChartSlider

An Angular slider component with bar chart.


## Installation

`npm install --save @jbrtrnd/ngx-chart-slider`

Import `NgxChartSlideModule` in your root Angular module :

```
import { NgxChartSliderModule } from '@jbrtrnd/ngx-chart-slider';

@NgModule({
    imports: [
        NgxChartSliderModule
    ],
})
export class AppModule {
}
```

Import ``node_modules/@jbrtrnd/ngx-chart-slider/src/lib/style/ngx-chart-slider.scss`` stylesheet in your root scss file :
```
@import "~@jbrtrnd/ngx-chart-slider/src/lib/style/ngx-chart-slider";
```

## Basic usage

NgxChartSlider works with ngModel and ReactiveForms.

For a simple slider :
<br />
``value`` will be a single value.
```
<ngx-chart-slider [(ngModel)]="value"
                  [steps]="steps">
</ngx-chart-slider>
```

For a range slider :
<br />
``value`` will be a two-entries array `[min, max]`.
```
<ngx-chart-slider [(ngModel)]="value"
                  [range]="true"
                  [steps]="steps">
</ngx-chart-slider>
```

(See [documentation](#Documentation) to `steps` input format)

## Documentation

<table>
    <tbody>
        <tr>
            <td><code>[range]</code></td>
            <td><code>boolean</code></td>
            <td>
                Set the slider mode :
                <br />
                <ul>
                    <li>In simple mode, value will be the one you provided in the step array</li>
                    <li>In range mode, value will be a 2-entries array. First entry will be the min value, second entry will be the max</li>
                </ul>
            </td>
        </tr>  
        <tr>
            <td><code>[steps]</code></td>
            <td><code>StepInterface[]</code></td>
            <td>
                The step array used to build slider.
                <br />
                <br />
                StepInterface :
                <br />
                <pre>
{
    label: string,     // Displayed label
    value: number,     // Step value
    chartData: number  // Step data used to draw bar
}
</pre>
            </td>
        </tr>
        <tr>
            <td><code>[displayLabels]</code></td>
            <td><code>'all' | 'none' | 'bounds'</code></td>
            <td>
                Step labels display mode :
                <br />
                <ul>
                    <li><code>all</code> : Display all steps labels</li>
                    <li><code>none</code> : Hide all steps labels</li>
                    <li><code>bounds</code> : Display first and last steps labels</li>
                </ul>
            </td>
        </tr>       
    </tbody>
</table>
