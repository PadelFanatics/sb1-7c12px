import { Location } from '@nativescript/geolocation';
import { Club } from '../models/club.model';

export class ClubService {
    async findNearbyClubs(location: Location): Promise<Array<Club>> {
        // In a real app, use Google Places API
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
            `location=${location.latitude},${location.longitude}&` +
            `radius=5000&` +
            `type=stadium&` +
            `keyword=padel&` +
            `key=YOUR_API_KEY`
        );
        
        const data = await response.json();
        
        return data.results.map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            rating: place.rating || 0,
            distance: this.calculateDistance(
                location.latitude,
                location.longitude,
                place.geometry.location.lat,
                place.geometry.location.lng
            ),
            photoUrl: place.photos ? 
                `https://maps.googleapis.com/maps/api/place/photo?` +
                `maxwidth=400&photoreference=${place.photos[0].photo_reference}&` +
                `key=YOUR_API_KEY` : 
                '~/images/default-club.jpg',
            location: {
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng
            }
        }));
    }

    private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
        const R = 6371; // Earth's radius in km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c;
        
        return d < 1 ? `${Math.round(d * 1000)}m` : `${d.toFixed(1)}km`;
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI/180);
    }
}