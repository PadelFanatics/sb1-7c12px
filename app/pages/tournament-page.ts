import { NavigatedData, Page, alert } from '@nativescript/core';
import { TournamentViewModel } from '../view-models/tournament-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const vm = new TournamentViewModel();
    
    // Check VIP status before showing tournament page
    if (!vm.isVIPMember) {
        alert({
            title: "VIP Feature",
            message: "Tournament mode is exclusively available to VIP members. Upgrade to VIP Premium to access tournaments and more exclusive features!",
            okButtonText: "Upgrade to VIP",
            cancelButtonText: "Maybe Later"
        }).then((result) => {
            if (result) {
                vm.upgradeToVIP();
            } else {
                page.frame.goBack();
            }
        });
        return;
    }
    
    page.bindingContext = vm;
}