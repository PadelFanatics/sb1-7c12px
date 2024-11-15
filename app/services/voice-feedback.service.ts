import { Application } from '@nativescript/core';

export class VoiceFeedbackService {
    speak(text: string): void {
        if (global.isAndroid) {
            const context = Application.android.context;
            const tts = new android.speech.tts.TextToSpeech(context, new android.speech.tts.TextToSpeech.OnInitListener({
                onInit: (status) => {
                    if (status !== android.speech.tts.TextToSpeech.ERROR) {
                        tts.speak(text, android.speech.tts.TextToSpeech.QUEUE_FLUSH, null);
                    }
                }
            }));
        } else if (global.isIOS) {
            const synthesizer = AVSpeechSynthesizer.alloc().init();
            const utterance = AVSpeechUtterance.alloc().initWithString(text);
            synthesizer.speakUtterance(utterance);
        }
    }

    announceFullScore(team1Name: string, team2Name: string, team1Score: string, team2Score: string, 
                     team1Games: number, team2Games: number, team1Sets: number, team2Sets: number): void {
        const scoreText = `Current score: ${team1Name} ${team1Score}, ${team2Name} ${team2Score}. ` +
                         `Games: ${team1Games} to ${team2Games}. ` +
                         `Sets: ${team1Sets} to ${team2Sets}.`;
        this.speak(scoreText);
    }
}