import { NavigatedData, Page } from '@nativescript/core';
import { HelpDeskConfirmationViewModel } from '../view-models/help-desk-confirmation-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = page.navigationContext;
    page.bindingContext = new HelpDeskConfirmationViewModel(context);
}