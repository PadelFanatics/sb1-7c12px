import { Observable, Frame } from '@nativescript/core';
import { Challenge } from '../models/challenge.model';
import { Share } from '@nativescript/core';

export class ChallengesViewModel extends Observable {
    private _challenges: Array<Challenge> = [];
    private _filteredChallenges: Array<Challenge> = [];
    private _selectedCategory: string = 'all';

    constructor() {
        super();
        this.loadChallenges();
    }

    private loadChallenges() {
        // In a real app, this would come from an API
        this._challenges = [
            {
                id: '1',
                title: 'Wall Rally Challenge',
                description: 'How many consecutive hits can you make against the wall? Try to beat your personal best!',
                videoUrl: 'https://www.youtube.com/embed/CHALLENGE_ID_1',
                difficulty: 'Beginner',
                likes: 156,
                isLiked: false,
                comments: [],
                category: 'beginner'
            },
            {
                id: '2',
                title: 'Precision Serve Master',
                description: 'Target specific zones with your serves. Points awarded for accuracy!',
                videoUrl: 'https://www.youtube.com/embed/CHALLENGE_ID_2',
                difficulty: 'Intermediate',
                likes: 243,
                isLiked: false,
                comments: [],
                category: 'intermediate'
            },
            {
                id: '3',
                title: 'Power Smash Challenge',
                description: 'Test your smash power and accuracy. Can you hit all targets?',
                videoUrl: 'https://www.youtube.com/embed/CHALLENGE_ID_3',
                difficulty: 'Advanced',
                likes: 389,
                isLiked: false,
                comments: [],
                category: 'advanced'
            }
        ];
        
        this.filterChallenges();
    }

    filterChallenges(args?: any) {
        if (args) {
            this._selectedCategory = args.object.get('data-category');
        }

        this._filteredChallenges = this._selectedCategory === 'all' 
            ? this._challenges 
            : this._challenges.filter(c => c.category === this._selectedCategory);

        this.notifyPropertyChange('filteredChallenges', this._filteredChallenges);
        this.notifyPropertyChange('selectedCategory', this._selectedCategory);
    }

    onLike(args: any) {
        const challenge = args.object.bindingContext;
        challenge.isLiked = !challenge.isLiked;
        challenge.likes += challenge.isLiked ? 1 : -1;
        this.notifyPropertyChange('filteredChallenges', this._filteredChallenges);
    }

    onComment(args: any) {
        const challenge = args.object.bindingContext;
        Frame.topmost().navigate({
            moduleName: 'pages/challenge-comments-page',
            context: challenge,
            transition: { name: 'slide' }
        });
    }

    async onShare(args: any) {
        const challenge = args.object.bindingContext;
        try {
            await Share.share({
                title: challenge.title,
                text: `Check out this awesome padel challenge: ${challenge.title}`,
                url: challenge.videoUrl
            });
        } catch (error) {
            console.error('Error sharing challenge:', error);
        }
    }

    showLeaderboard() {
        Frame.topmost().navigate({
            moduleName: 'pages/challenges-leaderboard-page',
            transition: { name: 'slide' }
        });
    }

    get filteredChallenges(): Array<Challenge> {
        return this._filteredChallenges;
    }

    get selectedCategory(): string {
        return this._selectedCategory;
    }
}