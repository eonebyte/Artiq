import { useContext } from 'react';
import { PostContext } from '../context/PostContext';

export const usePost = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePost must be used within a PostProvider');
    }
    return context;
};
