import { NavigatedData, Page } from '@nativescript/core';
import { WalkthroughViewModel } from '../view-models/walkthrough-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new WalkthroughViewModel();
}