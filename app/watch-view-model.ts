import { Observable } from '@nativescript/core';

export class WatchViewModel extends Observable {
    private _team1Score = '40';
    private _team2Score = '30';
    private _setHistory = {
        team1: ['6', '4', '2'],
        team2: ['4', '6', '2']
    };
    private _scoreHistory: Array<{team1: string, team2: string}> = [];
    private _currentHistoryIndex = -1;

    constructor() {
        super();
        this.saveCurrentState();
    }

    private saveCurrentState() {
        this._scoreHistory.push({
            team1: this._team1Score,
            team2: this._team2Score
        });
        this._currentHistoryIndex = this._scoreHistory.length - 1;
    }

    get team1Score(): string {
        return this._team1Score;
    }

    get team2Score(): string {
        return this._team2Score;
    }

    get setHistory() {
        return this._setHistory;
    }

    incrementTeam1Score() {
        this._team1Score = (parseInt(this._team1Score) + 1).toString();
        this.notifyPropertyChange('team1Score', this._team1Score);
        this.saveCurrentState();
    }

    decrementTeam1Score() {
        if (parseInt(this._team1Score) > 0) {
            this._team1Score = (parseInt(this._team1Score) - 1).toString();
            this.notifyPropertyChange('team1Score', this._team1Score);
            this.saveCurrentState();
        }
    }

    incrementTeam2Score() {
        this._team2Score = (parseInt(this._team2Score) + 1).toString();
        this.notifyPropertyChange('team2Score', this._team2Score);
        this.saveCurrentState();
    }

    decrementTeam2Score() {
        if (parseInt(this._team2Score) > 0) {
            this._team2Score = (parseInt(this._team2Score) - 1).toString();
            this.notifyPropertyChange('team2Score', this._team2Score);
            this.saveCurrentState();
        }
    }

    onUndo() {
        if (this._currentHistoryIndex > 0) {
            this._currentHistoryIndex--;
            const previousState = this._scoreHistory[this._currentHistoryIndex];
            this._team1Score = previousState.team1;
            this._team2Score = previousState.team2;
            this.notifyPropertyChange('team1Score', this._team1Score);
            this.notifyPropertyChange('team2Score', this._team2Score);
        }
    }

    onRedo() {
        if (this._currentHistoryIndex < this._scoreHistory.length - 1) {
            this._currentHistoryIndex++;
            const nextState = this._scoreHistory[this._currentHistoryIndex];
            this._team1Score = nextState.team1;
            this._team2Score = nextState.team2;
            this.notifyPropertyChange('team1Score', this._team1Score);
            this.notifyPropertyChange('team2Score', this._team2Score);
        }
    }
}