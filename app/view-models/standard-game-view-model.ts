import { Observable, Frame } from '@nativescript/core';
import { Club } from '../models/club.model';
import { User } from '../models/user.model';

export class StandardGameViewModel extends Observable {
    private _selectedDate: Date = new Date();
    private _searchQuery: string = '';
    private _currentUser: User;
    private _players: {[key: string]: User} = {};
    private _teamNames = {
        A: 'Team A',
        B: 'Team B'
    };

    constructor() {
        super();
        this._currentUser = {
            id: '1',
            name: 'Rob Murray',
            photoUrl: '~/images/profile-avatar.jpg',
            email: 'rob@example.com'
        };
        this.updateFormattedDateTime();
    }

    private updateFormattedDateTime() {
        const today = new Date();
        const isToday = this._selectedDate.toDateString() === today.toDateString();
        
        this.notifyPropertyChange('formattedDate', isToday ? 'Today' : 
            this._selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
        
        this.notifyPropertyChange('formattedTime', 
            this._selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }

    showDateTimePicker() {
        // Show native date/time picker dialog
        const picker = new Date();
        // After selection:
        this._selectedDate = picker;
        this.updateFormattedDateTime();
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

    editTeamName(args: any) {
        const team = args.object.get('data-team');
        // Show dialog to edit team name
        this._teamNames[team] = 'New Team Name';
        this.notifyPropertyChange(`team${team}Name`, this._teamNames[team]);
    }

    selectPlayer(args: any) {
        const team = args.object.get('data-team');
        const position = args.object.get('data-position');
        
        Frame.topmost().navigate({
            moduleName: 'pages/player-search-page',
            context: {
                onSelect: (player: User) => {
                    this._players[`team${team}_player${position}`] = player;
                    this.notifyPropertyChange(`team${team}_player${position}`, player);
                    Frame.topmost().goBack();
                    this.sendInvitation(player);
                }
            }
        });
    }

    private async sendInvitation(player: User) {
        console.log(`Sending invitation to ${player.email}`);
        // Implementation for sending invitations
    }

    startGame() {
        // Validate and start the game
        Frame.topmost().navigate({
            moduleName: 'pages/game-page',
            clearHistory: true
        });
    }

    get currentUser(): User {
        return this._currentUser;
    }
}