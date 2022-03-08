import React from 'react';
import { Story } from './Story.js';
import { useLatestStories } from '../hooks/stories.js';

export function App({ maxStories }) {

    const [stories, loadStories, sortOrder, changeSortOrder, status] = useLatestStories(maxStories);

    return (
        <div className="app-container">

            <h1 className="app-title">Hacker News Reader</h1>

            <div className="app-options">

                <select onChange={(e) => changeSortOrder(e.target.value)} defaultValue={sortOrder} className="app-options-sort" title="Sort order">
                    <option value="scoreDesc">Score (high-low)</option>
                    <option value="scoreAsc">Score (low-high)</option>
                    <option value="postedDesc">Posted (newest-oldest)</option>
                    <option value="postedAsc">Posted (oldest-newest)</option>
                </select>

                <button type="button" onClick={loadStories} disabled={status === 'loading'} className={`app-options-reload ${status === 'loading' ? 'app-options-reloading' : ''}`}>
                    {status === 'loading' ? 'Loading...' : 'Reload'}
                </button>

            </div>

            <div className="story-list">
                {stories.map(story => <Story key={story.id} story={story} />)}
            </div>

        </div>
    )

}