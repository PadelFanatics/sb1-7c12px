import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';

export class SideMenuViewModel extends Observable {
    closeMenu() {
        const frame = Frame.topmost();
        frame.goBack();
    }

    onChangePassword() {
        this.navigateTo('change-password-page');
    }

    onSettings() {
        this.navigateTo('settings-page');
    }

    onVIPPremium() {
        this.navigateTo('vip-premium-page');
    }

    onShareApp() {
        // Implement share functionality
        console.log('Share app');
    }

    onHelpDesk() {
        this.navigateTo('help-desk-page');
    }

    onShop() {
        this.navigateTo('shop-page');
    }

    onMatchInfo() {
        this.navigateTo('match-info-page');
    }

    onWalkthrough() {
        this.navigateTo('walkthrough-page');
    }

    private navigateTo(page: string) {
        const frame = Frame.topmost();
        frame.navigate({
            moduleName: page,
            transition: {
                name: 'slideLeft'
            }
        });
        this.closeMenu();
    }
}