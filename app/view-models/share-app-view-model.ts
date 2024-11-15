import { Observable, Utils, alert } from '@nativescript/core';

export class ShareAppViewModel extends Observable {
    private androidLink = 'https://www.Padelapplink.com';
    private iosLink = 'https://www.Padelapplink.com';
    private shareMessage = 'Check out Padel Fanatics - The ultimate Padel scoring app!';

    copyAndroidLink() {
        Utils.copyToClipboard(this.androidLink);
        this.showCopiedAlert();
    }

    copyIOSLink() {
        Utils.copyToClipboard(this.iosLink);
        this.showCopiedAlert();
    }

    copyLink() {
        Utils.copyToClipboard(this.androidLink);
        this.showCopiedAlert();
    }

    async shareViaWhatsApp() {
        const url = `whatsapp://send?text=${encodeURIComponent(this.shareMessage + '\n' + this.androidLink)}`;
        try {
            await Utils.openUrl(url);
        } catch (error) {
            alert({
                title: "WhatsApp Not Found",
                message: "Please install WhatsApp to share via WhatsApp.",
                okButtonText: "OK"
            });
        }
    }

    async shareViaEmail() {
        const url = `mailto:?subject=Check out Padel Fanatics&body=${encodeURIComponent(this.shareMessage + '\n' + this.androidLink)}`;
        try {
            await Utils.openUrl(url);
        } catch (error) {
            alert({
                title: "Email Error",
                message: "Unable to open email client.",
                okButtonText: "OK"
            });
        }
    }

    private showCopiedAlert() {
        alert({
            title: "Success",
            message: "Link copied to clipboard!",
            okButtonText: "OK"
        });
    }
}