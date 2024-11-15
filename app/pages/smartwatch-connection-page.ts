import { NavigatedData, Page } from '@nativescript/core';
import { SmartwatchConnectionViewModel } from '../view-models/smartwatch-connection-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new SmartwatchConnectionViewModel();
}