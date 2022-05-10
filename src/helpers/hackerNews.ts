import { takeRandom } from './utils';

const storyThumbnail: URL = new URL('../images/story-thumb.png', import.meta.url);

export function getTopStories(maxStories) {

    return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(res => res.json())
        .then((storyIds: number[]): Promise<ApiStory[]> => {

            // Select random X story ids from the API endpoint response.
            // Then take each story ID and fetch the story from the appropriate API endpoint.
            return Promise.all(takeRandom(storyIds, maxStories).map((storyId: number) => getStory(storyId)));

        })
        .then((stories: ApiStory[]): Promise<Story[]> => {

            const uniqueAuthors = [];

            // Loop through the stories retrieved from the API and build a list of unique authors.
            for (let i = 0; i < stories.length; i++) {

                const author = stories[i].by;

                if (!uniqueAuthors.includes(author)) {
                    uniqueAuthors.push(author);
                }

            }

            return new Promise((resolve, reject) => {

                // Call the API to retrieve the data for each author.
                Promise.all(uniqueAuthors.map((author: string) => getUser(author)))
                    .then((authors: ApiAuthor[]) => {

                        // Merge the story and the author together into a single object.
                        const storiesWithAuthor: Story[] = stories.map((story: ApiStory): Story => {

                            const author: ApiAuthor = authors.find((author: ApiAuthor) => author.id === story.by);

                            return {
                                id: story.id,
                                title: story.title,
                                url: story.url ? story.url : `https://news.ycombinator.com/item?id=${story.id}`,
                                timestamp: story.time,
                                dateTime: new Date(story.time * 1000),
                                score: story.score,
                                thumbnail: storyThumbnail.href,
                                author: {
                                    id: author.id,
                                    karma: author.karma,
                                }
                            }

                        });

                        resolve(storiesWithAuthor);

                    });

            });

        });

}

export function getStory(id: number): Promise<ApiStory> {

    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(res => res.json());

}

export function getUser(username: string): Promise<ApiAuthor> {

    return fetch(`https://hacker-news.firebaseio.com/v0/user/${username}.json`)
        .then(res => res.json());

}

export function sortStories(stories: Story[], sortOrder: string): void {

    let comparer;

    switch (sortOrder) {

        case 'postedAsc':

            comparer = (storyA, storyB) => storyA.timestamp - storyB.timestamp;
            break;

        case 'postedDesc':

            comparer = (storyA, storyB) => storyB.timestamp - storyA.timestamp;
            break;

        case 'scoreAsc':

            comparer = (storyA, storyB) => {
                if (storyA.score === storyB.score) {
                    return 0;
                }
                else if (storyA.score < storyB.score) {
                    return -1;
                }
                else {
                    return 1;
                }
            };

            break;

        default:
            comparer = (storyA, storyB) => {
                if (storyA.score === storyB.score) {
                    return 0;
                }
                else if (storyA.score > storyB.score) {
                    return -1;
                }
                else {
                    return 1;
                }
            };

            break;

    }

    stories.sort(comparer);

}