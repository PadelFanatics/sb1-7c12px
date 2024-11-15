import { Observable, Frame } from '@nativescript/core';

export class HelpDeskConfirmationViewModel extends Observable {
    private _name: string;

    constructor(context: { name: string }) {
        super();
        this._name = context.name;
    }

    get name(): string {
        return this._name;
    }

    onReturn() {
        Frame.topmost().navigate({
            moduleName: 'main-page',
            clearHistory: true
        });
    }
}