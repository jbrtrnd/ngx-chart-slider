import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    demo1 = {
        value: null,
        steps: makeData(50)
    };

    demo2 = {
        value: 5,
        steps: makeData(50).map((step: any) => {
            step.label = makeString(10);
            return step;
        })
    };

    demo3 = {
        value: 5,
        steps: makeData(50).map((step: any) => {
            step.label = makeString(10);
            return step;
        })
    };

    demo4 = {
        value: 5,
        steps: makeData(50).map((step: any) => {
            step.label = makeString(10);
            return step;
        })
    };

    demo5 = {
        value: 500,
        steps: makeData(1000)
    };

    demo6 = {
        value: null,
        steps: makeData(50)
    };

    demo7 = {
        value: [500, 800],
        steps: makeData(1000)
    };

    debug($event: any) {
        console.log('ngModelChange', $event);
    }

    changeSteps() {
        this.demo1.steps = makeData(Math.floor(Math.random() * (100 - 10 + 1) + 10));
    }

    changeRangeSteps() {
        this.demo6.steps = makeData(Math.floor(Math.random() * (100 - 10 + 1) + 10));
    }
}

function makeData(n: any) {
    const data = [];
    for (let i = 0; i < n; i++) {
        data.push({
            label: i,
            value: i,
            chartData: Math.random()
        })
    }

    return data;
}

function makeString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
