import { NavigatedData, Page } from '@nativescript/core';
import { ShopViewModel } from '../view-models/shop-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new ShopViewModel();
}