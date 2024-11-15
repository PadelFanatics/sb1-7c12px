import { Observable, Frame, ApplicationSettings, confirm } from '@nativescript/core';

export class ProfileViewModel extends Observable {
    constructor() {
        super();
    }

    onEditProfile() {
        Frame.topmost().navigate({
            moduleName: 'pages/edit-profile-page',
            transition: { name: 'slide' }
        });
    }

    onTermsConditions() {
        Frame.topmost().navigate({
            moduleName: 'pages/terms-conditions-page',
            transition: { name: 'slide' }
        });
    }

    onPrivacyPolicy() {
        Frame.topmost().navigate({
            moduleName: 'pages/privacy-policy-page',
            transition: { name: 'slide' }
        });
    }

    onAboutUs() {
        Frame.topmost().navigate({
            moduleName: 'pages/about-us-page',
            transition: { name: 'slide' }
        });
    }

    async onLogout() {
        const result = await confirm({
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            okButtonText: 'Yes',
            cancelButtonText: 'No'
        });

        if (result) {
            ApplicationSettings.remove('userToken');
            Frame.topmost().navigate({
                moduleName: 'pages/login-page',
                clearHistory: true
            });
        }
    }

    async onDeleteAccount() {
        const result = await confirm({
            title: 'Delete Account',
            message: 'Are you sure you want to delete your account? This action cannot be undone.',
            okButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        });

        if (result) {
            // Add API call to delete account
            ApplicationSettings.remove('userToken');
            Frame.topmost().navigate({
                moduleName: 'pages/login-page',
                clearHistory: true
            });
        }
    }
}