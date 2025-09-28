import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePost } from '@/hooks/use-post.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Search, MoveHorizontal as MoreHorizontal, CreditCard as Edit, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const PostsList = () => {
    const { posts, deletePost } = usePost();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleDeletePost = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            deletePost(id);
            toast.success('Post deleted successfully');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'default';
            case 'draft': return 'secondary';
            case 'archived': return 'destructive';
            default: return 'secondary';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your blog posts and articles
                    </p>
                </div>
                <Button asChild>
                    <Link to="/posts/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Post
                    </Link>
                </Button>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                    <Card key={post.id} className="flex flex-col">
                        {post.featuredImage && (
                            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                                <img
                                    src={post.featuredImage}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition-transform hover:scale-105"
                                />
                            </div>
                        )}
                        <CardHeader className="flex-1">
                            <div className="flex items-start justify-between">
                                <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link to={`/posts/edit/${post.id}`}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Eye className="mr-2 h-4 w-4" />
                                            Preview
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleDeletePost(post.id, post.title)}
                                            className="text-destructive"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <CardDescription className="line-clamp-3">
                                {post.excerpt}
                            </CardDescription>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {post.tags.slice(0, 3).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                                {post.tags.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                        +{post.tags.length - 3} more
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardFooter className="pt-0">
                            <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                                <div className="flex items-center space-x-2">
                                    <Badge variant={getStatusColor(post.status)}>
                                        {post.status}
                                    </Badge>
                                    <span>by {post.author}</span>
                                </div>
                                <span>{format(post.updatedAt, 'MMM d, yyyy')}</span>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No posts found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default PostsList;