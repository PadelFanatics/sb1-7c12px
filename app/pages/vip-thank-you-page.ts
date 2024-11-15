import { NavigatedData, Page } from '@nativescript/core';
import { VIPThankYouViewModel } from '../view-models/vip-thank-you-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = page.navigationContext;
    page.bindingContext = new VIPThankYouViewModel(context);
}