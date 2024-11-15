import { Observable, Frame, Utils } from '@nativescript/core';

export class MainViewModel extends Observable {
    private _menuOpen: boolean = false;

    constructor() {
        super();
    }

    get menuOpen(): boolean {
        return this._menuOpen;
    }

    toggleMenu() {
        this._menuOpen = !this._menuOpen;
        this.notifyPropertyChange('menuOpen', this._menuOpen);
    }

    closeMenu() {
        this._menuOpen = false;
        this.notifyPropertyChange('menuOpen', this._menuOpen);
    }

    onStartGame() {
        this.closeMenu();
        Frame.topmost().navigate('pages/standard-game-page');
    }

    onInviteFriends() {
        this.closeMenu();
        Frame.topmost().navigate('pages/invite-friends-page');
    }

    onWinPrizes() {
        this.closeMenu();
        Utils.openUrl('https://upvir.al/160543/lp160543');
    }

    onHelp() {
        this.closeMenu();
        Frame.topmost().navigate('pages/help-desk-page');
    }

    // ... rest of the existing methods remain the same
}