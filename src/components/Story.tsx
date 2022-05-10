import React from 'react';

const StarIcon: URL = new URL('../images/icon-star-solid.svg', import.meta.url);
const ThumbIcon: URL = new URL('../images/icon-thumb-up-regular.svg', import.meta.url);

interface StoryProps {
    key: number,
    story: Story
}

export function Story({ story }: StoryProps) {
    return (
        <article className="story">

            <div className="story-pre">
                <img src={story.thumbnail} alt="Hacker News logo" width="50" className="story-thumb" />
            </div>

            <div className="story-body">

                <h2 className="story-title"><a href={story.url} target="_blank">{story.title}</a></h2>
                <a href={story.url} target="_blank" className="story-url">{story.url}</a>

                <div className="story-meta">
                    <a href={`https://news.ycombinator.com/user?id=${story.author.id}`} target="_blank">{story.author.id} (<img src={StarIcon.href} className="story-karma-icon" alt="Star icon" width="12" />{story.author.karma})</a>
                    <span className="story-meta-separator">|</span>
                    <span className="story-timestamp">Posted: <time dateTime={story.dateTime.toISOString()}> {story.dateTime.toLocaleDateString()}</time></span>
                </div>

            </div>

            <div className="story-post">
                <img src={story.thumbnail} className="story-thumb" alt="Hacker News logo" width="50" />
                <img src={ThumbIcon.href} className="story-score-icon" alt="Thumbs up icon" width="20" />
                <span className="story-score-rating">{story.score}</span>
            </div>

        </article>
    )
}