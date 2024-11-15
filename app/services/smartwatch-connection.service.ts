import { Observable } from '@nativescript/core';

interface BluetoothDevice {
    UUID: string;
    name: string;
    state: string;
}

export class SmartwatchConnectionService extends Observable {
    private _isScanning: boolean = false;
    private _isConnected: boolean = false;
    private _connectedDevice: BluetoothDevice | null = null;
    private _discoveredDevices: Array<BluetoothDevice> = [];

    constructor() {
        super();
        // Initialize with mock data for preview
        this._discoveredDevices = [
            { UUID: '1', name: 'Mock Watch 1', state: 'disconnected' },
            { UUID: '2', name: 'Mock Watch 2', state: 'disconnected' }
        ];
    }

    async startScanning(): Promise<void> {
        if (this._isScanning) return;

        this._isScanning = true;
        this.notifyPropertyChange('isScanning', true);

        // Simulate scanning delay
        setTimeout(() => {
            this._isScanning = false;
            this.notifyPropertyChange('isScanning', false);
        }, 4000);
    }

    async connectToDevice(device: BluetoothDevice): Promise<void> {
        this._connectedDevice = device;
        this._isConnected = true;
        this.notifyPropertyChange('isConnected', true);
        this.notifyPropertyChange('connectedDevice', device);
    }

    async disconnect(): Promise<void> {
        this._connectedDevice = null;
        this._isConnected = false;
        this.notifyPropertyChange('isConnected', false);
        this.notifyPropertyChange('connectedDevice', null);
    }

    get isScanning(): boolean {
        return this._isScanning;
    }

    get isConnected(): boolean {
        return this._isConnected;
    }

    get connectedDevice(): BluetoothDevice | null {
        return this._connectedDevice;
    }

    get discoveredDevices(): Array<BluetoothDevice> {
        return this._discoveredDevices;
    }
}