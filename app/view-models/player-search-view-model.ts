import { Observable, Frame } from '@nativescript/core';
import { User } from '../models/user.model';

export class PlayerSearchViewModel extends Observable {
    private _searchQuery: string = '';
    private _players: Array<User> = [];
    private _filteredPlayers: Array<User> = [];
    private _onSelect: (player: User) => void;

    constructor(context: { onSelect: (player: User) => void }) {
        super();
        this._onSelect = context.onSelect;
        this.loadPlayers();
    }

    private loadPlayers() {
        // Sample data - in a real app, this would come from an API
        this._players = [
            {
                id: '2',
                name: 'Sarah Johnson',
                photoUrl: '~/images/players/sarah.jpg',
                email: 'sarah@example.com'
            },
            {
                id: '3',
                name: 'Mike Chen',
                photoUrl: '~/images/players/mike.jpg',
                email: 'mike@example.com'
            },
            {
                id: '4',
                name: 'Emma Wilson',
                photoUrl: '~/images/players/emma.jpg',
                email: 'emma@example.com'
            }
        ];
        this.filterPlayers();
    }

    private filterPlayers() {
        if (!this._searchQuery) {
            this._filteredPlayers = [...this._players];
        } else {
            const query = this._searchQuery.toLowerCase();
            this._filteredPlayers = this._players.filter(player => 
                player.name.toLowerCase().includes(query) ||
                player.email.toLowerCase().includes(query)
            );
        }
        this.notifyPropertyChange('filteredPlayers', this._filteredPlayers);
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
            this.filterPlayers();
        }
    }

    get filteredPlayers(): Array<User> {
        return this._filteredPlayers;
    }

    onSearchChange(args: any) {
        this.searchQuery = args.object.text;
    }

    clearSearch() {
        this.searchQuery = '';
    }

    selectPlayer(args: any) {
        const player = args.object.bindingContext;
        this._onSelect(player);
    }
}