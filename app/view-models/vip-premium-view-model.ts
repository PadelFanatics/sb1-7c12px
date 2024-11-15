import { Observable, Frame, alert } from '@nativescript/core';

export class VIPPremiumViewModel extends Observable {
    private _selectedPlan: string = 'basic';
    private _hasAgreed: boolean = false;

    constructor() {
        super();
    }

    get selectedPlan(): string {
        return this._selectedPlan;
    }

    get hasAgreed(): boolean {
        return this._hasAgreed;
    }

    get selectedPlanName(): string {
        switch(this._selectedPlan) {
            case 'basic':
                return 'VIP Premium 30 Day Test Drive (No Gift Box)';
            case 'premium':
                return 'VIP Premium 30 Day Test Drive (FREE Gift Box)';
            case 'annual':
                return 'VIP Premium Annual Plan';
            default:
                return '';
        }
    }

    get selectedPlanPrice(): string {
        switch(this._selectedPlan) {
            case 'basic':
                return '$0.00';
            case 'premium':
                return '$29.95';
            case 'annual':
                return '$99.70';
            default:
                return '';
        }
    }

    selectPlan(args: any) {
        const plan = args.object.get('data-plan');
        this._selectedPlan = plan;
        this.notifyPropertyChange('selectedPlan', plan);
        this.notifyPropertyChange('selectedPlanName', this.selectedPlanName);
        this.notifyPropertyChange('selectedPlanPrice', this.selectedPlanPrice);
    }

    toggleAgreement() {
        this._hasAgreed = !this._hasAgreed;
        this.notifyPropertyChange('hasAgreed', this._hasAgreed);
    }

    async onOrder() {
        if (!this._hasAgreed) {
            return;
        }

        try {
            // Here you would integrate with your payment processing service
            await alert({
                title: 'Order Processing',
                message: 'Please wait while we process your order...',
                okButtonText: 'OK'
            });

            // Navigate to thank you page with plan info
            Frame.topmost().navigate({
                moduleName: 'pages/vip-thank-you-page',
                context: {
                    plan: this._selectedPlan
                },
                clearHistory: true
            });
        } catch (error) {
            await alert({
                title: 'Error',
                message: 'There was an error processing your order. Please try again.',
                okButtonText: 'OK'
            });
        }
    }
}