import { Observable, Frame } from '@nativescript/core';

export class VIPThankYouViewModel extends Observable {
    private _orderDetails: string;
    private _orderNumber: string;
    private _hasGiftBox: boolean;

    constructor(context: any) {
        super();
        this._hasGiftBox = context?.plan === 'premium' || context?.plan === 'annual';
        this._orderNumber = `Order #${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        this._orderDetails = this.getOrderDetails(context?.plan);
    }

    private getOrderDetails(plan: string): string {
        switch(plan) {
            case 'premium':
                return 'VIP Premium 30 Day Test Drive with FREE Gift Box\n$29.95 setup fee + $9.97/month after trial';
            case 'annual':
                return 'VIP Premium Annual Plan with FREE Gift Box\n$99.70/year (Save Two Months!)';
            default:
                return 'VIP Premium 30 Day Test Drive\n$9.97/month after trial';
        }
    }

    get orderDetails(): string {
        return this._orderDetails;
    }

    get orderNumber(): string {
        return this._orderNumber;
    }

    get hasGiftBox(): boolean {
        return this._hasGiftBox;
    }

    onContinue() {
        Frame.topmost().navigate({
            moduleName: 'pages/vip-dashboard-page',
            clearHistory: true
        });
    }
}