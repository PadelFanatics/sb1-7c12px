import { EventData, Page } from '@nativescript/core';
import { WatchViewModel } from './watch-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new WatchViewModel();
}