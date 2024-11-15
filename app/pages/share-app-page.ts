import { NavigatedData, Page } from '@nativescript/core';
import { ShareAppViewModel } from '../view-models/share-app-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new ShareAppViewModel();
}