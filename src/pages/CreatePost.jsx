import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye, X } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';

const CreatePost = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        status: 'draft',
        tags: '',
        category: '',
        featuredImage: '',
        seoTitle: '',
        seoDescription: ''
    });

    const [isPreview, setIsPreview] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleContentChange = (content) => {
        setFormData(prev => ({
            ...prev,
            content: content
        }));
    };

    const handleSave = async (status = 'draft') => {
        setIsPublishing(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const postData = {
            ...formData,
            status: status,
            id: Date.now(), // Generate temporary ID
            author: 'John Doe',
            date: new Date().toISOString().split('T')[0],
            views: 0,
            likes: 0,
            comments: 0
        };

        console.log('Saving post:', postData);
        setIsPublishing(false);

        // Navigate back to posts page
        navigate('/posts');
    };

    const handlePublish = () => {
        handleSave('published');
    };

    const handleSaveDraft = () => {
        handleSave('draft');
    };

    if (isPreview) {
        return (
            <div className="max-w-4xl mx-auto">
                {/* Preview Header */}
                <div className="mb-6 flex items-center justify-between">
                    <button
                        onClick={() => setIsPreview(false)}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Edit
                    </button>
                    <div className="flex space-x-3">
                        <button
                            onClick={handleSaveDraft}
                            disabled={isPublishing}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        >
                            Save Draft
                        </button>
                        <button
                            onClick={handlePublish}
                            disabled={isPublishing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isPublishing ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                </div>

                {/* Preview Content */}
                <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {formData.featuredImage && (
                        <img
                            src={formData.featuredImage}
                            alt={formData.title}
                            className="w-full h-64 object-cover"
                        />
                    )}

                    <div className="p-8">
                        <div className="mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {formData.category || 'Uncategorized'}
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {formData.title || 'Untitled Post'}
                        </h1>

                        <div className="text-lg text-gray-600 mb-6">
                            {formData.excerpt}
                        </div>

                        <div className="flex items-center text-sm text-gray-500 mb-8">
                            <span>By John Doe</span>
                            <span className="mx-2">•</span>
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>

                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: formData.content }}
                        />

                        {formData.tags && (
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.split(',').map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                        >
                                            #{tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate('/posts')}
                        className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Posts
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={() => setIsPreview(true)}
                        className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                    </button>
                    <button
                        onClick={handleSaveDraft}
                        disabled={isPublishing}
                        className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Save Draft
                    </button>
                    <button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isPublishing ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter post title..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Excerpt
                        </label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleInputChange}
                            placeholder="Brief description of the post..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            This will be shown in post previews and search results.
                        </p>
                    </div>

                    {/* Content Editor */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content *
                        </label>
                        <RichTextEditor
                            content={formData.content}
                            onChange={handleContentChange}
                            placeholder="Start writing your post..."
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status & Visibility */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Publish Settings</h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select category...</option>
                                <option value="Technology">Technology</option>
                                <option value="Design">Design</option>
                                <option value="Development">Development</option>
                                <option value="Business">Business</option>
                                <option value="Tutorial">Tutorial</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags
                            </label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                placeholder="tag1, tag2, tag3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Separate tags with commas
                            </p>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h3>
                        <input
                            type="url"
                            name="featuredImage"
                            value={formData.featuredImage}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formData.featuredImage && (
                            <div className="mt-3">
                                <img
                                    src={formData.featuredImage}
                                    alt="Featured"
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SEO Title
                            </label>
                            <input
                                type="text"
                                name="seoTitle"
                                value={formData.seoTitle}
                                onChange={handleInputChange}
                                placeholder="SEO friendly title..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Description
                            </label>
                            <textarea
                                name="seoDescription"
                                value={formData.seoDescription}
                                onChange={handleInputChange}
                                placeholder="Description for search engines..."
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Recommended: 150-160 characters
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;