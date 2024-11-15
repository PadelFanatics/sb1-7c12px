import { Observable, Frame } from '@nativescript/core';
import { Club } from '../models/club.model';
import { LocationService } from '../services/location.service';
import { ClubService } from '../services/club.service';

export class ClubSearchViewModel extends Observable {
    private locationService: LocationService;
    private clubService: ClubService;
    private _searchQuery: string = '';
    private _clubs: Array<Club> = [];
    private _isLocating: boolean = false;

    constructor() {
        super();
        this.locationService = new LocationService();
        this.clubService = new ClubService();
        this.getCurrentLocation();
    }

    async getCurrentLocation() {
        try {
            this._isLocating = true;
            this.notifyPropertyChange('isLocating', true);

            const location = await this.locationService.getCurrentLocation();
            const clubs = await this.clubService.findNearbyClubs(location);
            
            this._clubs = clubs;
            this.notifyPropertyChange('clubs', clubs);
        } catch (error) {
            console.error('Error getting location:', error);
        } finally {
            this._isLocating = false;
            this.notifyPropertyChange('isLocating', false);
        }
    }

    async onSearch() {
        if (!this._searchQuery) return;

        try {
            this._isLocating = true;
            this.notifyPropertyChange('isLocating', true);

            const location = await this.locationService.geocodeAddress(this._searchQuery);
            const clubs = await this.clubService.findNearbyClubs(location);
            
            this._clubs = clubs;
            this.notifyPropertyChange('clubs', clubs);
        } catch (error) {
            console.error('Error searching location:', error);
        } finally {
            this._isLocating = false;
            this.notifyPropertyChange('isLocating', false);
        }
    }

    onClearSearch() {
        this._searchQuery = '';
        this.notifyPropertyChange('searchQuery', '');
        this.getCurrentLocation();
    }

    onClubSelect(args: any) {
        const club = args.object.bindingContext;
        Frame.topmost().navigate({
            moduleName: 'pages/club-detail-page',
            context: club,
            transition: { name: 'slide' }
        });
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
        }
    }

    get clubs(): Array<Club> {
        return this._clubs;
    }

    get isLocating(): boolean {
        return this._isLocating;
    }
}