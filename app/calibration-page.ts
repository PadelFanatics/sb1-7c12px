import { EventData, Page, NavigatedData } from '@nativescript/core';
import { CalibrationViewModel } from './view-models/calibration-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const vm = new CalibrationViewModel();
    page.bindingContext = vm;
    
    vm.on('calibrationComplete', () => {
        page.frame.navigate({
            moduleName: 'main-page',
            clearHistory: true
        });
    });
}