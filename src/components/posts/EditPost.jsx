import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePost } from '@/hooks/use-post.js';
import PostForm from './PostForm';
import { toast } from 'sonner';

const EditPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { updatePost, getPost } = usePost();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (id) {
            const foundPost = getPost(id);
            if (foundPost) {
                setPost(foundPost);
            } else {
                toast.error('Post not found');
                navigate('/posts');
            }
        }
    }, [id, getPost, navigate]);

    const handleSubmit = async (postData) => {
        if (!id) return;

        setIsSubmitting(true);
        try {
            updatePost(id, postData);
            toast.success('Post updated successfully!');
            navigate('/posts');
        } catch (error) {
            toast.error('Failed to update post');
            console.error('Error updating post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!post) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading post...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
                <p className="text-muted-foreground mt-2">
                    Update your blog post content and settings
                </p>
            </div>

            <PostForm
                initialData={post}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                mode="edit"
            />
        </div>

    );
};

export default EditPost;