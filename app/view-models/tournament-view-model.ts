import { Observable, Frame, alert } from '@nativescript/core';
import { User } from '../models/user.model';

interface TournamentPlayer extends User {
    rating?: number;
    teamName?: string;
}

export class TournamentViewModel extends Observable {
    private _isVIPMember: boolean = false;
    private _players: Array<TournamentPlayer> = [];
    private _tournamentName: string = '';
    private _selectedFormat: string = 'round_robin_single';
    private _startDate: Date = new Date();
    private _numberOfCourts: number = 1;
    private _teamSize: number = 2;

    constructor() {
        super();
        this.checkVIPStatus();
    }

    private checkVIPStatus() {
        // In real app, check user's subscription status
        this._isVIPMember = false;
    }

    get isVIPMember(): boolean {
        return this._isVIPMember;
    }

    get tournamentName(): string {
        return this._tournamentName;
    }

    set tournamentName(value: string) {
        if (this._tournamentName !== value) {
            this._tournamentName = value;
            this.notifyPropertyChange('tournamentName', value);
        }
    }

    get selectedFormat(): string {
        return this._selectedFormat;
    }

    selectFormat(args: any) {
        const format = args.object.get('data-format');
        this._selectedFormat = format;
        this.notifyPropertyChange('selectedFormat', format);
        
        if (format === 'mexicano') {
            this.assignRandomRatings();
        } else if (format === 'round_robin_teams') {
            this.assignTeams();
        }
    }

    private assignRandomRatings() {
        this._players.forEach(player => {
            player.rating = Math.floor(Math.random() * 1000) + 1000;
        });
        this.notifyPropertyChange('players', this._players);
    }

    private assignTeams() {
        const numTeams = Math.ceil(this._players.length / this._teamSize);
        this._players.forEach((player, index) => {
            player.teamName = `Team ${Math.floor(index / this._teamSize) + 1}`;
        });
        this.notifyPropertyChange('players', this._players);
    }

    get numberOfCourts(): number {
        return this._numberOfCourts;
    }

    decrementCourts() {
        if (this._numberOfCourts > 1) {
            this._numberOfCourts--;
            this.notifyPropertyChange('numberOfCourts', this._numberOfCourts);
        }
    }

    incrementCourts() {
        this._numberOfCourts++;
        this.notifyPropertyChange('numberOfCourts', this._numberOfCourts);
    }

    get teamSize(): number {
        return this._teamSize;
    }

    decrementTeamSize() {
        if (this._teamSize > 2) {
            this._teamSize--;
            this.notifyPropertyChange('teamSize', this._teamSize);
            this.assignTeams();
        }
    }

    incrementTeamSize() {
        if (this._teamSize < 4) {
            this._teamSize++;
            this.notifyPropertyChange('teamSize', this._teamSize);
            this.assignTeams();
        }
    }

    get players(): Array<TournamentPlayer> {
        return this._players;
    }

    addPlayer() {
        Frame.topmost().navigate({
            moduleName: 'pages/player-search-page',
            context: {
                onSelect: (player: User) => {
                    if (!this._players.find(p => p.id === player.id)) {
                        const tournamentPlayer: TournamentPlayer = {
                            ...player,
                            rating: this._selectedFormat === 'mexicano' ? 
                                Math.floor(Math.random() * 1000) + 1000 : undefined,
                            teamName: this._selectedFormat === 'round_robin_teams' ?
                                `Team ${Math.floor(this._players.length / this._teamSize) + 1}` : undefined
                        };
                        this._players.push(tournamentPlayer);
                        this.notifyPropertyChange('players', this._players);
                    }
                    Frame.topmost().goBack();
                }
            }
        });
    }

    removePlayer(args: any) {
        const player = args.object.bindingContext;
        const index = this._players.findIndex(p => p.id === player.id);
        if (index > -1) {
            this._players.splice(index, 1);
            if (this._selectedFormat === 'round_robin_teams') {
                this.assignTeams();
            }
            this.notifyPropertyChange('players', this._players);
        }
    }

    upgradeToVIP() {
        Frame.topmost().navigate({
            moduleName: 'pages/vip-premium-page',
            transition: { name: 'slide' }
        });
    }

    startTournament() {
        const minPlayers = this._selectedFormat === 'round_robin_teams' ? 
            this._teamSize * 2 : 4;

        if (this._players.length < minPlayers) {
            alert({
                title: "Not Enough Players",
                message: `Please add at least ${minPlayers} players to start the tournament.`,
                okButtonText: "OK"
            });
            return;
        }

        Frame.topmost().navigate({
            moduleName: 'pages/tournament-brackets-page',
            context: {
                players: this._players,
                format: this._selectedFormat,
                name: this._tournamentName,
                teamSize: this._teamSize,
                courts: this._numberOfCourts
            }
        });
    }
}