import { Observable } from '@nativescript/core';

export class PadelGame {
  private scores = ['0', '15', '30', '40', 'Ad'];
  private _team1Score = 0;
  private _team2Score = 0;
  private _team1Games = 0;
  private _team2Games = 0;
  private _team1Sets = 0;
  private _team2Sets = 0;
  private _setHistory = {
    team1: ['0', '0', '0'],
    team2: ['0', '0', '0']
  };
  private _currentSet = 0;

  decrementTeam1Score() {
    if (this._team1Score > 0) {
      this._team1Score--;
    }
  }

  decrementTeam2Score() {
    if (this._team2Score > 0) {
      this._team2Score--;
    }
  }

  setScores(team1Score: string, team2Score: string) {
    this._team1Score = this.scores.indexOf(team1Score);
    this._team2Score = this.scores.indexOf(team2Score);
  }

  incrementTeam1Score() {
    if (this._team1Score === 3 && this._team2Score === 3) {
      this._team1Score = 3;
    } else if (this._team1Score === 4) {
      this._team1Score = 0;
      this._team2Score = 0;
      this._team1Games++;
      this.updateSetHistory(this._team1Games, this._team2Games);
      this.checkSetWin();
    } else if (this._team2Score === 4) {
      this._team2Score = 3;
    } else {
      this._team1Score++;
    }
  }

  incrementTeam2Score() {
    if (this._team1Score === 3 && this._team2Score === 3) {
      this._team2Score = 3;
    } else if (this._team2Score === 4) {
      this._team1Score = 0;
      this._team2Score = 0;
      this._team2Games++;
      this.updateSetHistory(this._team1Games, this._team2Games);
      this.checkSetWin();
    } else if (this._team1Score === 4) {
      this._team1Score = 3;
    } else {
      this._team2Score++;
    }
  }

  private checkSetWin() {
    if (this._team1Games >= 6 && this._team1Games - this._team2Games >= 2) {
      this._team1Sets++;
      this._currentSet++;
      this.resetGames();
    } else if (this._team2Games >= 6 && this._team2Games - this._team1Games >= 2) {
      this._team2Sets++;
      this._currentSet++;
      this.resetGames();
    }
  }

  private resetGames() {
    this._team1Games = 0;
    this._team2Games = 0;
  }

  private updateSetHistory(team1Games: number, team2Games: number) {
    if (this._currentSet < 3) {
      this._setHistory.team1[this._currentSet] = team1Games.toString();
      this._setHistory.team2[this._currentSet] = team2Games.toString();
    }
  }

  get team1ScoreDisplay(): string {
    return this.scores[this._team1Score];
  }

  get team2ScoreDisplay(): string {
    return this.scores[this._team2Score];
  }

  get team1Games(): number {
    return this._team1Games;
  }

  get team2Games(): number {
    return this._team2Games;
  }

  get team1Sets(): number {
    return this._team1Sets;
  }

  get team2Sets(): number {
    return this._team2Sets;
  }

  get setHistory() {
    return this._setHistory;
  }
}