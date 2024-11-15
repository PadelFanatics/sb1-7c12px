import { Application } from '@nativescript/core';

export class SmartwatchService {
  async initialize(): Promise<void> {
    // Simplified initialization for demo
    console.log('Smartwatch service initialized');
  }

  async sendScore(team1Score: string, team2Score: string, team1Games: number, team2Games: number): Promise<void> {
    // Simplified score sending for demo
    console.log('Score sent to smartwatch:', {
      team1Score,
      team2Score,
      team1Games,
      team2Games
    });
  }
}