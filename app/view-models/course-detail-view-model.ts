import { Observable } from '@nativescript/core';
import { Course } from '../models/course.model';

export class CourseDetailViewModel extends Observable {
    private _course: Course;
    private _progress: number = 0;

    constructor(courseId: string) {
        super();
        this._course = this.loadCourse(courseId);
        this.calculateProgress();
    }

    private loadCourse(courseId: string): Course {
        // In a real app, this would come from an API
        const courses = {
            setup: {
                id: 'setup',
                title: 'Five Minute Padel Game Setup',
                description: 'Experience effortless scoring with our Five Minute Padel Game Setup! Simply invite friends, input team names, and you\'re ready to play in just five minutes. With voice-activated scoring, track every point by simply speaking, allowing you to focus on your game rather than the numbers. Plus, easily store and access your game results for future reference.',
                headerImage: '~/images/courses/game-setup-header.jpg',
                instructor: {
                    name: 'Rally Racoon',
                    title: 'Padel Prodigy and Padel Fanatics Instructor',
                    avatar: '~/images/instructors/rally-racoon.jpg',
                    bio: 'Meet Rally Racoon, the latest in a long line of legendary Padel-playing racoons! With a padel in his paw and a grin on his face, Rally is here to teach you the tricks of the trade passed down from his ancestors.'
                },
                lessons: [
                    {
                        title: 'Welcome Aboard!',
                        completed: false
                    }
                ]
            },
            // Add other courses...
        };

        return courses[courseId];
    }

    private calculateProgress() {
        const completedLessons = this._course.lessons.filter(l => l.completed).length;
        this._progress = (completedLessons / this._course.lessons.length) * 100;
        this.notifyPropertyChange('progress', this._progress);
        this.notifyPropertyChange('progressText', `${completedLessons} of ${this._course.lessons.length} Lessons`);
    }

    get course(): Course {
        return this._course;
    }

    get progress(): number {
        return this._progress;
    }

    get progressText(): string {
        const completed = this._course.lessons.filter(l => l.completed).length;
        return `${completed} of ${this._course.lessons.length} Lessons`;
    }

    get startButtonText(): string {
        return this._progress > 0 ? 'Continue Course' : 'Start Course';
    }

    onStartCourse() {
        // Navigate to lesson player
    }
}