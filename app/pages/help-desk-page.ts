import { NavigatedData, Page } from '@nativescript/core';
import { HelpDeskViewModel } from '../view-models/help-desk-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new HelpDeskViewModel();
}