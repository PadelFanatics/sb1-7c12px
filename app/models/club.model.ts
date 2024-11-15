export interface Club {
    id: string;
    name: string;
    address: string;
    rating: number;
    distance: string;
    photoUrl: string;
    location: {
        latitude: number;
        longitude: number;
    };
    openingHours?: {
        [key: string]: string;
    };
    phoneNumber?: string;
    website?: string;
}