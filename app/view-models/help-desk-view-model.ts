import { Observable, alert, Frame } from '@nativescript/core';

export class HelpDeskViewModel extends Observable {
    private _fullName: string = '';
    private _email: string = '';
    private _query: string = '';
    private _isSubmitting: boolean = false;
    private readonly GHL_FORM_URL = 'YOUR_GO_HIGH_LEVEL_FORM_ENDPOINT';

    get fullName(): string {
        return this._fullName;
    }

    set fullName(value: string) {
        if (this._fullName !== value) {
            this._fullName = value;
            this.notifyPropertyChange('fullName', value);
        }
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
        }
    }

    get query(): string {
        return this._query;
    }

    set query(value: string) {
        if (this._query !== value) {
            this._query = value;
            this.notifyPropertyChange('query', value);
        }
    }

    get isSubmitting(): boolean {
        return this._isSubmitting;
    }

    private validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async onSubmit() {
        // Validate inputs
        if (!this._fullName.trim()) {
            alert({
                title: "Error",
                message: "Please enter your full name",
                okButtonText: "OK"
            });
            return;
        }

        if (!this.validateEmail(this._email)) {
            alert({
                title: "Error",
                message: "Please enter a valid email address",
                okButtonText: "OK"
            });
            return;
        }

        if (!this._query.trim()) {
            alert({
                title: "Error",
                message: "Please enter your query",
                okButtonText: "OK"
            });
            return;
        }

        this._isSubmitting = true;
        this.notifyPropertyChange('isSubmitting', true);

        try {
            const response = await fetch(this.GHL_FORM_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: this._fullName,
                    email: this._email,
                    query: this._query
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Navigate to confirmation page
            Frame.topmost().navigate({
                moduleName: 'pages/help-desk-confirmation-page',
                context: {
                    name: this._fullName
                }
            });

        } catch (error) {
            alert({
                title: "Error",
                message: "Failed to submit your query. Please try again later.",
                okButtonText: "OK"
            });
        } finally {
            this._isSubmitting = false;
            this.notifyPropertyChange('isSubmitting', false);
        }
    }
}