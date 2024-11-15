export interface Comment {
    id: string;
    userId: string;
    username: string;
    text: string;
    timestamp: Date;
    score?: number;
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    likes: number;
    isLiked: boolean;
    comments: Comment[];
    bestScore?: number;
    category: string;
}