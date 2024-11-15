import { Observable, Frame } from '@nativescript/core';
import { Animation } from '@nativescript/core/ui/animation';

interface WalkthroughSlide {
    icon: string;
    title: string;
    description: string;
    backgroundImage: string;
    spotlightTarget: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

export class WalkthroughViewModel extends Observable {
    private _currentIndex: number = 0;
    private _backgroundOpacity: number = 0.3;
    private _overlayOpacity: number = 0.7;
    private _spotlightAnimation: Animation;
    private _slides: Array<WalkthroughSlide> = [
        {
            icon: '👤',
            title: 'Profile Setup',
            description: 'Set up your profile with your name, photo, and preferred game settings.',
            backgroundImage: '~/images/walkthrough/profile-bg.png',
            spotlightTarget: { x: 20, y: 100, width: 200, height: 100 }
        },
        {
            icon: '🎮',
            title: 'Game Modes',
            description: 'Choose from Standard Game, Tournament Mode, or Instant Play for quick matches.',
            backgroundImage: '~/images/walkthrough/modes-bg.png',
            spotlightTarget: { x: 40, y: 150, width: 250, height: 150 }
        },
        {
            icon: '🏆',
            title: 'Tournaments',
            description: 'Organize and participate in tournaments with different formats.',
            backgroundImage: '~/images/walkthrough/tournament-bg.png',
            spotlightTarget: { x: 60, y: 200, width: 300, height: 200 }
        },
        {
            icon: '⌚',
            title: 'Smartwatch Integration',
            description: 'Connect your smartwatch for easy score tracking.',
            backgroundImage: '~/images/walkthrough/watch-bg.png',
            spotlightTarget: { x: 80, y: 250, width: 150, height: 150 }
        }
    ];

    constructor() {
        super();
        this.startSpotlightAnimation();
    }

    private startSpotlightAnimation() {
        // Create pulsing animation for spotlight
        this._spotlightAnimation = new Animation([
            {
                target: this.currentSlide.spotlightTarget,
                scale: { x: 1.1, y: 1.1 },
                duration: 1000,
                iterations: Number.POSITIVE_INFINITY,
                curve: 'easeInOut'
            }
        ]);
        this._spotlightAnimation.play();
    }

    get currentIndex(): number {
        return this._currentIndex;
    }

    get currentSlide(): WalkthroughSlide {
        return this._slides[this._currentIndex];
    }

    get backgroundOpacity(): number {
        return this._backgroundOpacity;
    }

    get overlayOpacity(): number {
        return this._overlayOpacity;
    }

    get slides(): Array<WalkthroughSlide> {
        return this._slides;
    }

    onNext() {
        if (this._currentIndex < this._slides.length - 1) {
            this._spotlightAnimation.cancel();
            this._currentIndex++;
            this.notifyPropertyChange('currentIndex', this._currentIndex);
            this.notifyPropertyChange('currentSlide', this.currentSlide);
            this.startSpotlightAnimation();
        } else {
            this.finishWalkthrough();
        }
    }

    onSkip() {
        this._spotlightAnimation.cancel();
        this.finishWalkthrough();
    }

    private finishWalkthrough() {
        Frame.topmost().goBack();
    }
}