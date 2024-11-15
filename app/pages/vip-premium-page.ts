import { NavigatedData, Page } from '@nativescript/core';
import { VIPPremiumViewModel } from '../view-models/vip-premium-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new VIPPremiumViewModel();
}