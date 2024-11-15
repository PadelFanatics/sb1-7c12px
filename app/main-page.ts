import { EventData, Page } from '@nativescript/core';
import { MainViewModel } from './view-models/main-view-model';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  // Initialize with default settings for testing
  const vm = new MainViewModel();
  vm.settings = {
    team1Name: 'Team 1',
    team2Name: 'Team 2',
    activationPhrase: 'Hey Padel'
  };
  page.bindingContext = vm;
}