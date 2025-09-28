import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePost } from '@/hooks/use-post.js';
import PostForm from './PostForm';
import { toast } from 'sonner';

const CreatePost = () => {
    const navigate = useNavigate();
    const { addPost } = usePost();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (postData) => {
        setIsSubmitting(true);
        try {
            addPost(postData);
            toast.success('Post created successfully!');
            navigate('/posts');
        } catch (error) {
            toast.error('Failed to create post');
            console.error('Error creating post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
                <p className="text-muted-foreground mt-2">
                    Write and publish your new blog post
                </p>
            </div>

            <PostForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                mode="create"
            />
        </div>

    );
};

export default CreatePost;