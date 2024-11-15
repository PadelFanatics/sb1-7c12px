import { NavigatedData, Page } from '@nativescript/core';
import { PlayerSearchViewModel } from '../view-models/player-search-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = page.navigationContext;
    page.bindingContext = new PlayerSearchViewModel(context);
}