import { Observable } from '@nativescript/core';
import { PadelGame } from '../models/game';
import { GameTimer } from '../models/timer';
import { VoiceRecognitionService } from '../services/voice-recognition.service';
import { VoiceFeedbackService } from '../services/voice-feedback.service';

export class InstantPlayViewModel extends Observable {
    private game: PadelGame;
    private timer: GameTimer;
    private voiceRecognition: VoiceRecognitionService;
    private voiceFeedback: VoiceFeedbackService;

    constructor() {
        super();
        this.game = new PadelGame();
        this.timer = new GameTimer();
        this.voiceRecognition = new VoiceRecognitionService();
        this.voiceFeedback = new VoiceFeedbackService();
        
        // Start timer automatically
        this.timer.start();
        
        // Start voice recognition
        this.startVoiceControl();
    }

    private async startVoiceControl() {
        try {
            await this.voiceRecognition.startListening((command) => {
                switch(command) {
                    case 'team1':
                        this.onTeam1Point();
                        break;
                    case 'team2':
                        this.onTeam2Point();
                        break;
                    case 'undo':
                        this.onUndo();
                        break;
                    case 'redo':
                        this.onRedo();
                        break;
                    case 'score':
                        this.announceScore();
                        break;
                    case 'time':
                        this.announceTime();
                        break;
                }
            });
        } catch (error) {
            console.error('Error starting voice control:', error);
        }
    }

    onTeam1Point() {
        this.game.incrementTeam1Score();
        this.notifyScoreChanges();
    }

    onTeam2Point() {
        this.game.incrementTeam2Score();
        this.notifyScoreChanges();
    }

    onUndo() {
        // Implement undo logic
    }

    onRedo() {
        // Implement redo logic
    }

    private notifyScoreChanges() {
        this.notifyPropertyChange('team1Score', this.team1Score);
        this.notifyPropertyChange('team2Score', this.team2Score);
        this.notifyPropertyChange('team1Games', this.team1Games);
        this.notifyPropertyChange('team2Games', this.team2Games);
        this.notifyPropertyChange('team1Sets', this.team1Sets);
        this.notifyPropertyChange('team2Sets', this.team2Sets);
        this.notifyPropertyChange('setHistory', this.setHistory);
    }

    private announceScore() {
        this.voiceFeedback.announceFullScore(
            'Team A', 'Team B',
            this.team1Score, this.team2Score,
            this.team1Games, this.team2Games,
            this.team1Sets, this.team2Sets
        );
    }

    private announceTime() {
        this.voiceFeedback.speak(this.timer.timeSpoken);
    }

    // Getters for the view
    get timeDisplay(): string {
        return this.timer.timeDisplay;
    }

    get team1Score(): string {
        return this.game.team1ScoreDisplay;
    }

    get team2Score(): string {
        return this.game.team2ScoreDisplay;
    }

    get team1Games(): number {
        return this.game.team1Games;
    }

    get team2Games(): number {
        return this.game.team2Games;
    }

    get team1Sets(): number {
        return this.game.team1Sets;
    }

    get team2Sets(): number {
        return this.game.team2Sets;
    }

    get setHistory() {
        return this.game.setHistory;
    }
}