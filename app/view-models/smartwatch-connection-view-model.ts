import { Observable, alert } from '@nativescript/core';
import { SmartwatchConnectionService } from '../services/smartwatch-connection.service';

export class SmartwatchConnectionViewModel extends Observable {
    private connectionService: SmartwatchConnectionService;

    constructor() {
        super();
        this.connectionService = new SmartwatchConnectionService();
        this.bindServiceProperties();
    }

    private bindServiceProperties() {
        // Bind service properties to view model
        Object.defineProperties(this, {
            isScanning: {
                get: () => this.connectionService.isScanning
            },
            isConnected: {
                get: () => this.connectionService.isConnected
            },
            connectedDevice: {
                get: () => this.connectionService.connectedDevice
            },
            discoveredDevices: {
                get: () => this.connectionService.discoveredDevices
            }
        });
    }

    async toggleScan() {
        if (this.connectionService.isScanning) {
            // Stop scanning logic would be handled by timeout in the service
            return;
        }

        try {
            await this.connectionService.startScanning();
        } catch (error) {
            alert({
                title: "Scanning Error",
                message: error.message || "Failed to start scanning for devices",
                okButtonText: "OK"
            });
        }
    }

    async onDeviceSelect(args: any) {
        const device = args.object.bindingContext;
        try {
            await this.connectionService.connectToDevice(device);
            alert({
                title: "Success",
                message: `Connected to ${device.name}`,
                okButtonText: "OK"
            });
        } catch (error) {
            alert({
                title: "Connection Error",
                message: error.message || "Failed to connect to device",
                okButtonText: "OK"
            });
        }
    }

    async disconnect() {
        try {
            await this.connectionService.disconnect();
        } catch (error) {
            alert({
                title: "Disconnect Error",
                message: error.message || "Failed to disconnect from device",
                okButtonText: "OK"
            });
        }
    }
}