import { Accuracy, getCurrentLocation, Location } from '@nativescript/geolocation';
import { requestPermission } from 'nativescript-permissions-lite';

export class LocationService {
    async checkPermissions(): Promise<boolean> {
        if (global.isAndroid) {
            try {
                const permission = android.Manifest.permission.ACCESS_FINE_LOCATION;
                const hasPermission = await requestPermission(permission);
                return hasPermission;
            } catch (error) {
                console.error('Error requesting permission:', error);
                return false;
            }
        }
        return true;
    }

    async getCurrentLocation(): Promise<Location> {
        const hasPermission = await this.checkPermissions();
        if (!hasPermission) {
            throw new Error('Location permission denied');
        }

        return getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            maximumAge: 5000,
            timeout: 20000
        });
    }

    async geocodeAddress(address: string): Promise<Location> {
        // In a real app, use Google Geocoding API
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_API_KEY`
        );
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng
            };
        }
        
        throw new Error('Location not found');
    }
}