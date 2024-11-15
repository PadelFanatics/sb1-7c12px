import { EventData, Page, NavigatedData } from '@nativescript/core';
import { MainViewModel } from './view-models/main-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = page.navigationContext;
}

export function navigateToSettings(args: EventData) {
    const page = <Page>args.object;
    const vm = page.bindingContext as MainViewModel;
    
    page.frame.navigate({
        moduleName: 'settings-page',
        context: vm
    });
}