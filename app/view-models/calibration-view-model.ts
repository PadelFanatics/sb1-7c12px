import { Observable, ApplicationSettings } from '@nativescript/core';
import { VoiceRecognitionService } from '../services/voice-recognition.service';
import { VoiceFeedbackService } from '../services/voice-feedback.service';

export class CalibrationViewModel extends Observable {
    private voiceService: VoiceRecognitionService;
    private feedbackService: VoiceFeedbackService;
    private _isListening = false;
    private _progress = 0;
    private _currentStep = 0;
    private calibrationSteps = [
        {
            prompt: "Welcome to Padel Score! Let's set up voice control.",
            instruction: "Press Start and say 'Hey Padel' clearly"
        },
        {
            prompt: "Perfect! Now let's customize your team names",
            instruction: "Say 'Team One point' or use custom team names"
        },
        {
            prompt: "Great! Let's learn the game commands",
            instruction: "Try saying 'What's the score' and 'Time left'"
        },
        {
            prompt: "Almost done! Final commands to learn",
            instruction: "Say 'Undo point' and 'Redo point'"
        }
    ];

    constructor() {
        super();
        this.voiceService = new VoiceRecognitionService();
        this.feedbackService = new VoiceFeedbackService();
        this.updateStep();
    }

    private updateStep() {
        this.notifyPropertyChange('currentPrompt', this.calibrationSteps[this._currentStep].prompt);
        this.notifyPropertyChange('instruction', this.calibrationSteps[this._currentStep].instruction);
    }

    async toggleListening() {
        if (this._isListening) {
            await this.voiceService.stopListening();
            this._isListening = false;
        } else {
            await this.voiceService.startListening((command) => {
                this.handleVoiceCommand(command);
            });
            this._isListening = true;
        }
        this.notifyPropertyChange('isListening', this._isListening);
    }

    private handleVoiceCommand(command: string) {
        this._progress += 25;
        if (this._progress >= 100) {
            this.completeCalibration();
        } else {
            this._currentStep++;
            this.updateStep();
        }
        this.notifyPropertyChange('progress', this._progress);
        this.notifyPropertyChange('progressText', `${this._progress}% complete`);
    }

    private completeCalibration() {
        ApplicationSettings.setBoolean('hasCompletedCalibration', true);
        this.feedbackService.speak('Setup complete! You can now use voice commands in your games.');
        this.notify({ eventName: 'calibrationComplete', object: this });
    }

    skipCalibration() {
        ApplicationSettings.setBoolean('hasCompletedCalibration', true);
        this.notify({ eventName: 'calibrationComplete', object: this });
    }

    get currentPrompt(): string {
        return this.calibrationSteps[this._currentStep].prompt;
    }

    get instruction(): string {
        return this.calibrationSteps[this._currentStep].instruction;
    }

    get isListening(): boolean {
        return this._isListening;
    }

    get progress(): number {
        return this._progress;
    }

    get progressText(): string {
        return `${this._progress}% complete`;
    }
}