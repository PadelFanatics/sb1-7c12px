import { NavigatedData, Page } from '@nativescript/core';
import { TournamentResultsViewModel } from '../view-models/tournament-results-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = page.navigationContext;
    page.bindingContext = new TournamentResultsViewModel(context);
}