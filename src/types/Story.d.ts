declare interface Story {
    id: number,
    title: string,
    url: string ,
    timestamp: number,
    dateTime: Date,
    score: number,
    thumbnail: string,
    author: StoryAuthor
}