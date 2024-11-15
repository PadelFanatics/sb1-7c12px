import { Observable, Frame } from '@nativescript/core';

interface MatchPlayer {
    id: string;
    name: string;
    photoUrl: string;
}

interface Match {
    id: string;
    date: string;
    type: string;
    duration: string;
    team1Name: string;
    team2Name: string;
    team1Player1: MatchPlayer;
    team1Player2: MatchPlayer;
    team2Player1: MatchPlayer;
    team2Player2: MatchPlayer;
    score: string;
    sets: string[];
    result: 'win' | 'loss' | 'draw';
}

export class MatchInfoViewModel extends Observable {
    private _dateFilters = ['All Time', 'This Week', 'This Month', 'This Year'];
    private _typeFilters = ['All Types', 'Standard', 'Tournament', 'Instant'];
    private _resultFilters = ['All Results', 'Wins', 'Losses'];
    private _selectedDateFilter = 0;
    private _selectedTypeFilter = 0;
    private _selectedResultFilter = 0;
    private _matches: Array<Match> = [];
    private _filteredMatches: Array<Match> = [];

    constructor() {
        super();
        this.loadMatches();
    }

    private loadMatches() {
        // In a real app, this would load from an API or local storage
        this._matches = [
            {
                id: '1',
                date: '2024-01-15',
                type: 'Standard',
                duration: '1h 30m',
                team1Name: 'Team A',
                team2Name: 'Team B',
                team1Player1: {
                    id: '1',
                    name: 'John',
                    photoUrl: '~/images/players/john.jpg'
                },
                team1Player2: {
                    id: '2',
                    name: 'Sarah',
                    photoUrl: '~/images/players/sarah.jpg'
                },
                team2Player1: {
                    id: '3',
                    name: 'Mike',
                    photoUrl: '~/images/players/mike.jpg'
                },
                team2Player2: {
                    id: '4',
                    name: 'Emma',
                    photoUrl: '~/images/players/emma.jpg'
                },
                score: '2-1',
                sets: ['6-4', '4-6', '6-3'],
                result: 'win'
            }
            // Add more matches...
        ];
        
        this.filterMatches();
    }

    private filterMatches() {
        let filtered = [...this._matches];

        // Apply date filter
        if (this._selectedDateFilter > 0) {
            const now = new Date();
            const filterDate = new Date();
            
            switch(this._selectedDateFilter) {
                case 1: // This Week
                    filterDate.setDate(now.getDate() - 7);
                    break;
                case 2: // This Month
                    filterDate.setMonth(now.getMonth() - 1);
                    break;
                case 3: // This Year
                    filterDate.setFullYear(now.getFullYear() - 1);
                    break;
            }

            filtered = filtered.filter(match => new Date(match.date) >= filterDate);
        }

        // Apply type filter
        if (this._selectedTypeFilter > 0) {
            const type = this._typeFilters[this._selectedTypeFilter];
            filtered = filtered.filter(match => match.type === type);
        }

        // Apply result filter
        if (this._selectedResultFilter > 0) {
            const result = this._selectedResultFilter === 1 ? 'win' : 'loss';
            filtered = filtered.filter(match => match.result === result);
        }

        this._filteredMatches = filtered;
        this.notifyPropertyChange('filteredMatches', this._filteredMatches);
    }

    onMatchSelect(args: any) {
        const match = args.object.bindingContext;
        Frame.topmost().navigate({
            moduleName: 'pages/match-detail-page',
            context: match
        });
    }

    showStats() {
        Frame.topmost().navigate({
            moduleName: 'pages/match-stats-page',
            context: {
                matches: this._matches
            }
        });
    }

    // Getters and setters
    get dateFilters(): Array<string> {
        return this._dateFilters;
    }

    get typeFilters(): Array<string> {
        return this._typeFilters;
    }

    get resultFilters(): Array<string> {
        return this._resultFilters;
    }

    get selectedDateFilter(): number {
        return this._selectedDateFilter;
    }

    set selectedDateFilter(value: number) {
        if (this._selectedDateFilter !== value) {
            this._selectedDateFilter = value;
            this.notifyPropertyChange('selectedDateFilter', value);
            this.filterMatches();
        }
    }

    get selectedTypeFilter(): number {
        return this._selectedTypeFilter;
    }

    set selectedTypeFilter(value: number) {
        if (this._selectedTypeFilter !== value) {
            this._selectedTypeFilter = value;
            this.notifyPropertyChange('selectedTypeFilter', value);
            this.filterMatches();
        }
    }

    get selectedResultFilter(): number {
        return this._selectedResultFilter;
    }

    set selectedResultFilter(value: number) {
        if (this._selectedResultFilter !== value) {
            this._selectedResultFilter = value;
            this.notifyPropertyChange('selectedResultFilter', value);
            this.filterMatches();
        }
    }

    get filteredMatches(): Array<Match> {
        return this._filteredMatches;
    }
}