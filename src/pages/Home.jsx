import React from "react";
import {
    FileText,
    Eye,
    Heart,
    MessageSquare,
    TrendingUp,
    Activity
} from "lucide-react";

const Home = () => {
    // Sample data untuk posts
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
        }
    ];

    return (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Posts</p>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Eye className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Views</p>
                            <p className="text-2xl font-bold text-gray-900">12,456</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Heart className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Likes</p>
                            <p className="text-2xl font-bold text-gray-900">1,234</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <MessageSquare className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Comments</p>
                            <p className="text-2xl font-bold text-gray-900">456</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-blue-600" />
                        Recent Posts
                    </h3>
                    <div className="space-y-4">
                        {posts.slice(0, 3).map((post) => (
                            <div key={post.id} className="flex items-start space-x-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <FileText className="h-4 w-4 text-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {post.title}
                                    </p>
                                    <p className="text-xs text-gray-500">{post.date}</p>
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.status === 'published'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {post.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                        Top Performing Posts
                    </h3>
                    <div className="space-y-4">
                        {posts.sort((a, b) => b.views - a.views).slice(0, 3).map((post) => (
                            <div key={post.id} className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {post.title}
                                    </p>
                                    <div className="flex items-center space-x-4 mt-1">
                                        <span className="text-xs text-gray-500 flex items-center">
                                            <Eye className="h-3 w-3 mr-1" />
                                            {post.views.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center">
                                            <Heart className="h-3 w-3 mr-1" />
                                            {post.likes}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
                <p className="text-blue-100 mb-4">
                    You have 3 new notifications and 5 pending posts to review.
                </p>
                <div className="flex space-x-4">
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                        View Notifications
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-400 transition-colors">
                        Review Posts
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;