import { NavigatedData, Page } from '@nativescript/core';
import { TournamentMatchViewModel } from '../view-models/tournament-match-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = page.navigationContext;
    page.bindingContext = new TournamentMatchViewModel(context);
}