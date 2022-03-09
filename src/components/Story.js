import React from 'react';
import StarIcon from '../images/icon-star-solid.svg';
import ThumbIcon from '../images/icon-thumb-up-regular.svg';

export function Story({ story }) {

    let heading = story.title;
    let link = null;

    if (story.url) {
        heading = <a href={story.url} target="_blank">{story.title}</a>;
        link = <a href={story.url} target="_blank" className="story-url">{story.url}</a>;
    }

    return (
        <article className="story">

            <div className="story-pre">
                <img src={story.thumbnail} alt="Hacker News logo" width="50" className="story-thumb" />
            </div>

            <div className="story-body">

                <h2 className="story-title">{heading}</h2>
                {link}

                <div className="story-meta">
                    <a href={`https://news.ycombinator.com/user?id=${story.author.id}`} target="_blank">{story.author.id} (<img src={StarIcon} className="story-karma-icon" alt="Star icon" width="12" />{story.author.karma})</a>
                    <span className="story-meta-separator">|</span>
                    <span className="story-timestamp">Posted: <time dateTime={story.dateTime.toISOString()}> {story.dateTime.toLocaleDateString()}</time></span>
                </div>

            </div>

            <div className="story-post">
                <img src={story.thumbnail} className="story-thumb" alt="Hacker News logo" width="50" />
                <img src={ThumbIcon} className="story-score-icon" alt="Thumbs up icon" width="20" />
                <span className="story-score-rating">{story.score}</span>
            </div>

        </article>
    )
}