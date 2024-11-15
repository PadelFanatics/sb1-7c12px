import { Observable, Frame } from '@nativescript/core';

export class TournamentBracketsViewModel extends Observable {
    private _matches: Array<any>;
    private _tournamentName: string;
    private _format: string;
    private _progress: string;
    private _isComplete: boolean = false;

    constructor(context: any) {
        super();
        this._tournamentName = context.tournamentName;
        this._format = context.format;
        this.loadMatches();
    }

    private loadMatches() {
        // In a real app, this would load from an API
        const completedMatches = this._matches?.filter(m => m.status === 'Completed') || [];
        const totalMatches = this._matches?.length || 0;
        
        this._progress = `${completedMatches.length}/${totalMatches} matches completed`;
        this._isComplete = completedMatches.length === totalMatches;

        if (this._isComplete) {
            Frame.topmost().navigate({
                moduleName: 'pages/tournament-results-page',
                context: {
                    tournamentName: this._tournamentName,
                    format: this._format,
                    matches: this._matches
                },
                clearHistory: true
            });
        }
    }

    onMatchSelect(args: any) {
        const match = args.object.bindingContext;
        Frame.topmost().navigate({
            moduleName: 'pages/tournament-match-page',
            context: {
                matchId: match.id,
                tournamentId: match.tournamentId,
                team1Name: match.team1Name,
                team2Name: match.team2Name,
                matchInfo: match.roundName
            }
        });
    }

    get matches(): Array<any> {
        return this._matches;
    }

    get tournamentName(): string {
        return this._tournamentName;
    }

    get format(): string {
        return this._format;
    }

    get progress(): string {
        return this._progress;
    }
}