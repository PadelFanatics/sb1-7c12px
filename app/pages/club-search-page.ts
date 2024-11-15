import { NavigatedData, Page } from '@nativescript/core';
import { ClubSearchViewModel } from '../view-models/club-search-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new ClubSearchViewModel();
}