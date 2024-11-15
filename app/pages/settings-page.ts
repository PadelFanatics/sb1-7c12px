import { NavigatedData, Page } from '@nativescript/core';
import { SettingsViewModel } from '../view-models/settings-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new SettingsViewModel();
}