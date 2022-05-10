import React from 'react';
import { useState, useEffect } from 'react';
import { getTopStories, sortStories } from '../helpers/hackerNews';

export function useLatestStories(maxStories): [Story[], { (): void }, string, { (sortOrder: string): void }, string] {

    const [stories, setStories]: [Story[], React.Dispatch<React.SetStateAction<Story[]>>] = useState([]);
    const [sortOrder, setSortOrder]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('scoreDesc');
    const [status, setStatus]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('loading');

    function loadStories(): void {

        // Flag that we're loading stories.
        setStatus('loading');

        // Get the top stories and then update the state with them.
        getTopStories(maxStories)
            .then((stories: Story[]) => {
                setStories(stories);
                setStatus('complete');
            });
    }

    function updateSortOrder(sortOrder): void {
        setSortOrder(sortOrder);
    }

    useEffect(() => {
        loadStories();
    }, []);

    sortStories(stories, sortOrder);

    return [stories, loadStories, sortOrder, updateSortOrder, status];

}