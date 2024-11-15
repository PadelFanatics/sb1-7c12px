import { Observable, ApplicationSettings } from '@nativescript/core';

export class SettingsViewModel extends Observable {
    private _themes = ['Light', 'Dark', 'System'];
    private _setOptions = ['3 Set', '5 Set'];
    private _gameOptions = ['6 Game', '9 Game'];
    private _advantageOptions = ['Advantage', 'No Advantage'];
    private _soundEnabled: boolean;
    private _selectedThemeIndex: number;
    private _selectedSetsIndex: number;
    private _selectedGamesIndex: number;
    private _selectedAdvantageIndex: number;

    constructor() {
        super();
        this.loadSettings();
    }

    private loadSettings() {
        // Load saved settings or use defaults
        this._soundEnabled = ApplicationSettings.getBoolean('soundEnabled', true);
        this._selectedThemeIndex = ApplicationSettings.getNumber('themeIndex', 0);
        this._selectedSetsIndex = ApplicationSettings.getNumber('setsIndex', 0);
        this._selectedGamesIndex = ApplicationSettings.getNumber('gamesIndex', 0);
        this._selectedAdvantageIndex = ApplicationSettings.getNumber('advantageIndex', 0);

        this.notifyPropertyChanges();
    }

    private notifyPropertyChanges() {
        this.notifyPropertyChange('soundEnabled', this._soundEnabled);
        this.notifyPropertyChange('selectedThemeIndex', this._selectedThemeIndex);
        this.notifyPropertyChange('selectedSetsIndex', this._selectedSetsIndex);
        this.notifyPropertyChange('selectedGamesIndex', this._selectedGamesIndex);
        this.notifyPropertyChange('selectedAdvantageIndex', this._selectedAdvantageIndex);
    }

    private saveSettings() {
        ApplicationSettings.setBoolean('soundEnabled', this._soundEnabled);
        ApplicationSettings.setNumber('themeIndex', this._selectedThemeIndex);
        ApplicationSettings.setNumber('setsIndex', this._selectedSetsIndex);
        ApplicationSettings.setNumber('gamesIndex', this._selectedGamesIndex);
        ApplicationSettings.setNumber('advantageIndex', this._selectedAdvantageIndex);
    }

    // Getters and setters
    get themes(): Array<string> {
        return this._themes;
    }

    get setOptions(): Array<string> {
        return this._setOptions;
    }

    get gameOptions(): Array<string> {
        return this._gameOptions;
    }

    get advantageOptions(): Array<string> {
        return this._advantageOptions;
    }

    get soundEnabled(): boolean {
        return this._soundEnabled;
    }

    set soundEnabled(value: boolean) {
        if (this._soundEnabled !== value) {
            this._soundEnabled = value;
            this.notifyPropertyChange('soundEnabled', value);
            this.saveSettings();
        }
    }

    get selectedThemeIndex(): number {
        return this._selectedThemeIndex;
    }

    set selectedThemeIndex(value: number) {
        if (this._selectedThemeIndex !== value) {
            this._selectedThemeIndex = value;
            this.notifyPropertyChange('selectedThemeIndex', value);
            this.saveSettings();
            this.applyTheme();
        }
    }

    get selectedSetsIndex(): number {
        return this._selectedSetsIndex;
    }

    set selectedSetsIndex(value: number) {
        if (this._selectedSetsIndex !== value) {
            this._selectedSetsIndex = value;
            this.notifyPropertyChange('selectedSetsIndex', value);
            this.saveSettings();
        }
    }

    get selectedGamesIndex(): number {
        return this._selectedGamesIndex;
    }

    set selectedGamesIndex(value: number) {
        if (this._selectedGamesIndex !== value) {
            this._selectedGamesIndex = value;
            this.notifyPropertyChange('selectedGamesIndex', value);
            this.saveSettings();
        }
    }

    get selectedAdvantageIndex(): number {
        return this._selectedAdvantageIndex;
    }

    set selectedAdvantageIndex(value: number) {
        if (this._selectedAdvantageIndex !== value) {
            this._selectedAdvantageIndex = value;
            this.notifyPropertyChange('selectedAdvantageIndex', value);
            this.saveSettings();
        }
    }

    private applyTheme() {
        // Implement theme switching logic
        const theme = this._themes[this._selectedThemeIndex].toLowerCase();
        // Apply theme changes to app
    }

    onStreamLive() {
        // Implement live streaming functionality
        console.log('Starting live stream...');
    }
}