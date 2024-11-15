import { Observable } from '@nativescript/core';

export class GameTimer extends Observable {
    private _timeLeft: number;
    private _timer: number;
    private _isRunning: boolean = false;
    private _defaultTime: number = 90 * 60; // 90 minutes in seconds

    constructor() {
        super();
        this._timeLeft = this._defaultTime;
    }

    start() {
        if (!this._isRunning) {
            this._isRunning = true;
            this._timer = setInterval(() => {
                if (this._timeLeft > 0) {
                    this._timeLeft--;
                    this.notifyPropertyChange('timeDisplay', this.timeDisplay);
                } else {
                    this.stop();
                }
            }, 1000);
        }
    }

    stop() {
        if (this._isRunning) {
            clearInterval(this._timer);
            this._isRunning = false;
        }
    }

    reset() {
        this._timeLeft = this._defaultTime;
        this.notifyPropertyChange('timeDisplay', this.timeDisplay);
    }

    get timeLeft(): number {
        return this._timeLeft;
    }

    get timeDisplay(): string {
        const minutes = Math.floor(this._timeLeft / 60);
        const seconds = this._timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    get timeSpoken(): string {
        const minutes = Math.floor(this._timeLeft / 60);
        return `${minutes} minutes remaining`;
    }
}