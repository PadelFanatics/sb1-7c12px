import { NavigatedData, Page } from '@nativescript/core';
import { InstantPlayViewModel } from '../view-models/instant-play-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new InstantPlayViewModel();
}