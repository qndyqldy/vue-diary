export type Diary = {
    id?: number,
    emotionId: number,
    createdDate: number,
    content: string
}

export type DiaryInput = {
    id?: number;
    createdDate: Date;
    emotionId: number;
    content: string;
}