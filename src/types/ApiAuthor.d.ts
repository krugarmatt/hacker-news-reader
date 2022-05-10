declare interface ApiAuthor {
    id: string,
    created: number,
    karma: number,
    about: string | undefined,
    submitted: number[]
}