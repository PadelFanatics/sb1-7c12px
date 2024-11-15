import { Application, ApplicationSettings } from '@nativescript/core';

export interface VoiceSettings {
  team1Name: string;
  team2Name: string;
  activationPhrase: string;
}

export class VoiceRecognitionService {
  private isListening = false;
  private settings: VoiceSettings;
  private feedbackService: VoiceFeedbackService;

  constructor() {
    this.loadSettings();
    this.feedbackService = new VoiceFeedbackService();
  }

  private loadSettings() {
    this.settings = {
      team1Name: ApplicationSettings.getString('team1Name', 'Team One'),
      team2Name: ApplicationSettings.getString('team2Name', 'Team Two'),
      activationPhrase: ApplicationSettings.getString('activationPhrase', 'Hey Padel')
    };
  }

  saveSettings(settings: VoiceSettings) {
    ApplicationSettings.setString('team1Name', settings.team1Name);
    ApplicationSettings.setString('team2Name', settings.team2Name);
    ApplicationSettings.setString('activationPhrase', settings.activationPhrase);
    this.settings = settings;
  }

  getSettings(): VoiceSettings {
    return { ...this.settings };
  }

  async checkPermission(): Promise<boolean> {
    if (global.isAndroid) {
      const permissions = require('@nativescript/permissions');
      return permissions.requestPermission(android.Manifest.permission.RECORD_AUDIO);
    }
    return true;
  }

  async startListening(callback: (command: string) => void): Promise<void> {
    if (this.isListening) return;
    
    const success = await this.checkPermission();
    if (!success) {
      this.feedbackService.speak('Microphone permission denied');
      return;
    }

    this.isListening = true;
    this.feedbackService.speak('Listening for commands');
    
    if (global.isAndroid) {
      const SpeechRecognizer = android.speech.SpeechRecognizer;
      const Intent = android.speech.RecognizerIntent;
      
      const recognizer = SpeechRecognizer.createSpeechRecognizer(Application.android.context);
      const intent = new Intent(Intent.ACTION_RECOGNIZE_SPEECH);
      
      intent.putExtra(Intent.EXTRA_LANGUAGE_MODEL, Intent.LANGUAGE_MODEL_FREE_FORM);
      intent.putExtra(Intent.EXTRA_MAX_RESULTS, 1);
      
      recognizer.setRecognitionListener(new android.speech.RecognitionListener({
        onResults: (results) => {
          const matches = results.getStringArrayList(android.speech.SpeechRecognizer.RESULTS_RECOGNITION);
          if (matches && matches.size() > 0) {
            const command = matches.get(0).toLowerCase();
            
            if (command.includes(this.settings.team1Name.toLowerCase())) {
              this.feedbackService.speak('Point for ' + this.settings.team1Name);
              callback('team1');
            } else if (command.includes(this.settings.team2Name.toLowerCase())) {
              this.feedbackService.speak('Point for ' + this.settings.team2Name);
              callback('team2');
            } else if (command.includes(this.settings.activationPhrase.toLowerCase())) {
              this.feedbackService.speak('Voice control activated');
              callback('activate');
            } else if (command.includes('undo')) {
              this.feedbackService.speak('Undoing last point');
              callback('undo');
            } else if (command.includes('redo')) {
              this.feedbackService.speak('Redoing point');
              callback('redo');
            } else if (command.includes('score')) {
              callback('score');
            } else if (command.includes('time')) {
              callback('time');
            } else {
              this.feedbackService.speak('Command not recognized');
            }
          }
        },
        onError: (error) => {
          this.feedbackService.speak('Error recognizing command');
        },
        onEndOfSpeech: () => {
          if (this.isListening) {
            recognizer.startListening(intent);
          }
        }
      }));
      
      recognizer.startListening(intent);
    } else if (global.isIOS) {
      const speechRecognizer = SFSpeechRecognizer.alloc().init();
      const recognitionRequest = SFSpeechAudioBufferRecognitionRequest.alloc().init();
      
      speechRecognizer.recognitionTaskWithRequestResultHandler(recognitionRequest, (result, error) => {
        if (result) {
          const command = result.bestTranscription.formattedString.toLowerCase();
          
          if (command.includes(this.settings.team1Name.toLowerCase())) {
            this.feedbackService.speak('Point for ' + this.settings.team1Name);
            callback('team1');
          } else if (command.includes(this.settings.team2Name.toLowerCase())) {
            this.feedbackService.speak('Point for ' + this.settings.team2Name);
            callback('team2');
          } else if (command.includes(this.settings.activationPhrase.toLowerCase())) {
            this.feedbackService.speak('Voice control activated');
            callback('activate');
          } else if (command.includes('undo')) {
            this.feedbackService.speak('Undoing last point');
            callback('undo');
          } else if (command.includes('redo')) {
            this.feedbackService.speak('Redoing point');
            callback('redo');
          } else if (command.includes('score')) {
            callback('score');
          } else if (command.includes('time')) {
            callback('time');
          } else {
            this.feedbackService.speak('Command not recognized');
          }
        }
      });
    }
  }

  async stopListening(): Promise<void> {
    this.isListening = false;
    this.feedbackService.speak('Voice control deactivated');
    if (global.isAndroid) {
      const recognizer = android.speech.SpeechRecognizer.createSpeechRecognizer(Application.android.context);
      recognizer.stopListening();
      recognizer.destroy();
    }
  }
}