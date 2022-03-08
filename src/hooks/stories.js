import { useState, useEffect } from 'react';
import { getTopStories, sortStories } from '../helpers/hackerNews.js';

export function useLatestStories(maxStories) {

    const [stories, setStories] = useState([]);
    const [sortOrder, setSortOrder] = useState('scoreDesc');
    const [status, setStatus] = useState('loading');

    function loadStories() {

        // Flag that we're loading stories.
        setStatus('loading');

        // Get the top stories and then update the state with them.
        getTopStories(maxStories)
            .then(stories => {
                setStories(stories);
                setStatus('complete');
            });
    }

    function updateSortOrder(sortOrder) {
        setSortOrder(sortOrder);
    }

    useEffect(() => {
        loadStories();
    }, []);

    sortStories(stories, sortOrder);

    return [stories, loadStories, sortOrder, updateSortOrder, status];

}