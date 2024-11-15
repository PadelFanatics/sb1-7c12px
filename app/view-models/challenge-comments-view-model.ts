import { Observable } from '@nativescript/core';
import { Challenge, Comment } from '../models/challenge.model';

export class ChallengeCommentsViewModel extends Observable {
    private _challenge: Challenge;
    private _comments: Array<Comment>;
    private _newComment: string = '';

    constructor(challenge: Challenge) {
        super();
        this._challenge = challenge;
        this._comments = challenge.comments;
    }

    get comments(): Array<Comment> {
        return this._comments;
    }

    get newComment(): string {
        return this._newComment;
    }

    set newComment(value: string) {
        if (this._newComment !== value) {
            this._newComment = value;
            this.notifyPropertyChange('newComment', value);
        }
    }

    submitComment() {
        if (!this._newComment.trim()) return;

        const scoreMatch = this._newComment.match(/\d+/);
        const score = scoreMatch ? parseInt(scoreMatch[0]) : undefined;

        const comment: Comment = {
            id: Math.random().toString(36).substr(2, 9),
            userId: 'current-user-id',
            username: 'Current User',
            text: this._newComment,
            timestamp: new Date(),
            score
        };

        this._comments.unshift(comment);
        this.notifyPropertyChange('comments', this._comments);
        this._newComment = '';
        this.notifyPropertyChange('newComment', '');
    }
}