export interface Instructor {
    name: string;
    title: string;
    avatar: string;
    bio: string;
}

export interface Lesson {
    title: string;
    completed: boolean;
    videoUrl?: string;
    duration?: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    headerImage: string;
    instructor: Instructor;
    lessons: Lesson[];
}