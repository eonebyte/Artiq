import React from "react";
import { useNavigate } from "react-router-dom";

import {
    Plus,
    Eye,
    Edit,
    Trash2,
    MessageSquare,
    Heart,
    Share2,
    Search
} from "lucide-react";

const Posts = () => {
    const navigate = useNavigate();
    const posts = [
        {
            id: 1,
            title: "Getting Started with React Hooks",
            excerpt: "Learn how to use React Hooks to build better functional components with state management.",
            author: "John Doe",
            date: "2025-09-25",
            status: "published",
            views: 1234,
            likes: 45,
            comments: 12
        },
        {
            id: 2,
            title: "Advanced TypeScript Patterns",
            excerpt: "Explore advanced TypeScript patterns for building scalable applications with better type safety.",
            author: "Jane Smith",
            date: "2025-09-24",
            status: "draft",
            views: 856,
            likes: 23,
            comments: 8
        },
        {
            id: 3,
            title: "Building Responsive Layouts with Tailwind CSS",
            excerpt: "Master responsive design using Tailwind CSS utility classes for modern web applications.",
            author: "Mike Johnson",
            date: "2025-09-23",
            status: "published",
            views: 2156,
            likes: 78,
            comments: 24
        },
        {
            id: 4,
            title: "State Management with Zustand",
            excerpt: "A lightweight alternative to Redux for managing state in React applications.",
            author: "Sarah Wilson",
            date: "2025-09-22",
            status: "published",
            views: 987,
            likes: 34,
            comments: 15
        },
        {
            id: 5,
            title: "API Integration Best Practices",
            excerpt: "Learn the best practices for integrating external APIs in your web applications.",
            author: "Alex Brown",
            date: "2025-09-21",
            status: "draft",
            views: 654,
            likes: 19,
            comments: 6
        }
    ];

    return (
        <>
            {/* Posts Header */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Posts</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Manage your blog posts and articles
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <button onClick={() => navigate("/posts/create")} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            <Plus className="h-4 w-4 mr-2" />
                            New Post
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Status</option>
                            <option>Published</option>
                            <option>Draft</option>
                        </select>
                        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Authors</option>
                            <option>John Doe</option>
                            <option>Jane Smith</option>
                            <option>Mike Johnson</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                        />
                    </div>
                </div>
            </div>

            {/* Posts List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                    {posts.map((post) => (
                        <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                                            onClick={() => navigate(`/posts/edit/${post.id}`)}>
                                            {post.title}
                                        </h3>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.status === 'published'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {post.status}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                                        <span>By {post.author}</span>
                                        <span>{post.date}</span>
                                        <span className="flex items-center">
                                            <Eye className="h-4 w-4 mr-1" />
                                            {post.views.toLocaleString()} views
                                        </span>
                                        <span className="flex items-center">
                                            <Heart className="h-4 w-4 mr-1" />
                                            {post.likes} likes
                                        </span>
                                        <span className="flex items-center">
                                            <MessageSquare className="h-4 w-4 mr-1" />
                                            {post.comments} comments
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 ml-4">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Share2 className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing 1 to {posts.length} of {posts.length} results
                        </p>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                1
                            </button>
                            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                2
                            </button>
                            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Posts;