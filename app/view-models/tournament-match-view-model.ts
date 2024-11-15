import { Observable, Frame, alert } from '@nativescript/core';

interface Set {
    team1Score: string;
    team2Score: string;
    team1Games: number;
    team2Games: number;
    index: number;
}

interface TeamStats {
    totalPoints: number;
    setsWon: number;
}

export class TournamentMatchViewModel extends Observable {
    private _tournamentName: string;
    private _matchTitle: string;
    private _matchInfo: string;
    private _team1Name: string;
    private _team2Name: string;
    private _sets: Array<Set>;
    private _matchNotes: string = '';
    private _team1Stats: TeamStats;
    private _team2Stats: TeamStats;
    private _matchId: string;
    private _tournamentId: string;

    constructor(context: any) {
        super();
        this._tournamentId = context.tournamentId;
        this._matchId = context.matchId;
        this._tournamentName = context.tournamentName;
        this._team1Name = context.team1Name;
        this._team2Name = context.team2Name;
        this._matchTitle = `${this._team1Name} vs ${this._team2Name}`;
        this._matchInfo = context.matchInfo || 'Round 1';
        
        this.initializeSets();
        this.calculateStats();
    }

    private initializeSets() {
        this._sets = Array(3).fill(null).map((_, index) => ({
            team1Score: '',
            team2Score: '',
            team1Games: 0,
            team2Games: 0,
            index
        }));
        this.notifyPropertyChange('sets', this._sets);
    }

    private calculateStats() {
        const stats = this._sets.reduce((acc, set) => {
            const team1Score = parseInt(set.team1Score) || 0;
            const team2Score = parseInt(set.team2Score) || 0;
            
            acc.team1.totalPoints += team1Score;
            acc.team2.totalPoints += team2Score;
            
            if (team1Score > team2Score) acc.team1.setsWon++;
            if (team2Score > team1Score) acc.team2.setsWon++;
            
            return acc;
        }, {
            team1: { totalPoints: 0, setsWon: 0 },
            team2: { totalPoints: 0, setsWon: 0 }
        });

        this._team1Stats = stats.team1;
        this._team2Stats = stats.team2;
        
        this.notifyPropertyChange('team1Stats', this._team1Stats);
        this.notifyPropertyChange('team2Stats', this._team2Stats);
    }

    async submitResult() {
        // Validate scores
        const incompleteSet = this._sets.find(set => 
            (set.team1Score && !set.team2Score) || (!set.team1Score && set.team2Score));
        
        if (incompleteSet) {
            alert({
                title: "Incomplete Scores",
                message: "Please enter both scores for each set played.",
                okButtonText: "OK"
            });
            return;
        }

        try {
            // Submit match result to tournament system
            const result = {
                matchId: this._matchId,
                tournamentId: this._tournamentId,
                sets: this._sets,
                team1Stats: this._team1Stats,
                team2Stats: this._team2Stats,
                notes: this._matchNotes,
                timestamp: new Date()
            };

            // In a real app, send to API
            console.log('Submitting match result:', result);

            // Navigate back to tournament brackets
            Frame.topmost().navigate({
                moduleName: 'pages/tournament-brackets-page',
                context: {
                    tournamentId: this._tournamentId
                },
                clearHistory: true
            });
        } catch (error) {
            alert({
                title: "Error",
                message: "Failed to submit match result. Please try again.",
                okButtonText: "OK"
            });
        }
    }

    // Getters
    get tournamentName(): string {
        return this._tournamentName;
    }

    get matchTitle(): string {
        return this._matchTitle;
    }

    get matchInfo(): string {
        return this._matchInfo;
    }

    get team1Name(): string {
        return this._team1Name;
    }

    get team2Name(): string {
        return this._team2Name;
    }

    get sets(): Array<Set> {
        return this._sets;
    }

    get matchNotes(): string {
        return this._matchNotes;
    }

    set matchNotes(value: string) {
        if (this._matchNotes !== value) {
            this._matchNotes = value;
            this.notifyPropertyChange('matchNotes', value);
        }
    }

    get team1Stats(): TeamStats {
        return this._team1Stats;
    }

    get team2Stats(): TeamStats {
        return this._team2Stats;
    }
}