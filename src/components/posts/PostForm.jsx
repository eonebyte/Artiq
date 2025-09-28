import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RichTextEditor from './RichTextEditor';
import { X, Save, Eye, ArrowLeft } from 'lucide-react';


const PostForm = ({ initialData, onSubmit, isSubmitting, mode }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        content: initialData?.content || '',
        excerpt: initialData?.excerpt || '',
        status: initialData?.status || 'draft',
        author: initialData?.author || 'John Doe',
        tags: initialData?.tags || [],
        featuredImage: initialData?.featuredImage || '',
    });
    const [tagInput, setTagInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.content.trim()) {
            return;
        }

        onSubmit({
            ...formData,
            excerpt: formData.excerpt || generateExcerpt(formData.content),
        });
    };

    const generateExcerpt = (content) => {
        const textContent = content.replace(/<[^>]+>/g, '');
        return textContent.length > 160
            ? textContent.substring(0, 160) + '...'
            : textContent;
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()]
            });
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate('/posts')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Posts
                </Button>
                <div className="flex space-x-2">
                    <Button type="button" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting
                            ? (mode === 'create' ? 'Creating...' : 'Updating...')
                            : (mode === 'create' ? 'Create Post' : 'Update Post')
                        }
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter post title..."
                                    className="mt-1"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="content">Content</Label>
                                <div className="mt-1">
                                    <RichTextEditor
                                        content={formData.content}
                                        onChange={(content) => setFormData({ ...formData, content })}
                                        placeholder="Start writing your post..."
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="excerpt">Excerpt (Optional)</Label>
                                <Textarea
                                    id="excerpt"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Brief description of your post..."
                                    className="mt-1"
                                    rows={3}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Leave blank to auto-generate from content
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, status: value })
                                    }
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="author">Author</Label>
                                <Input
                                    id="author"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="featuredImage">Featured Image URL (Optional)</Label>
                                <Input
                                    id="featuredImage"
                                    value={formData.featuredImage}
                                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="tags">Tags</Label>
                                <div className="mt-1 space-y-2">
                                    <Input
                                        id="tags"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Add a tag and press Enter"
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="pr-1">
                                                {tag}
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="ml-1 h-auto p-0 text-muted-foreground hover:text-destructive"
                                                    onClick={() => removeTag(tag)}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
};

export default PostForm;