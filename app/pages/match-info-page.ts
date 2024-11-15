import { NavigatedData, Page } from '@nativescript/core';
import { MatchInfoViewModel } from '../view-models/match-info-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new MatchInfoViewModel();
}