import { NavigatedData, Page } from '@nativescript/core';
import { ProfileViewModel } from '../view-models/profile-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new ProfileViewModel();
}