// src/components/layout/MainLayout.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    HomeIcon,
    UsersIcon,
    Cog6ToothIcon,
    DocumentTextIcon,
    ChartBarIcon,
    CalendarIcon,
    EnvelopeIcon,
    BellIcon,
    UserCircleIcon,
    Bars3Icon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
    { id: "home", label: "Home", icon: HomeIcon, path: "/" },
    { id: "posts", label: "Posts", icon: DocumentTextIcon, path: "/posts" },
    { id: "users", label: "Users", icon: UsersIcon, path: "/users" },
    { id: "analytics", label: "Analytics", icon: ChartBarIcon, path: "/analytics" },
    { id: "calendar", label: "Calendar", icon: CalendarIcon, path: "/calendar" },
    { id: "mail", label: "Mail", icon: EnvelopeIcon, path: "/mail" },
    { id: "settings", label: "Settings", icon: Cog6ToothIcon, path: "/settings" },
];

const MainLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);

    const getCurrentPage = () => {
        const current = menuItems.find((item) => item.path === location.pathname);
        return current ? current.label : "Dashboard";
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            {/* Sidebar */}
            <aside
                className={`bg-white shadow-lg border-r border-gray-200 flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                    }`}
            >
                {/* Sidebar Brand */}
<div className="flex items-center justify-between p-4 border-b border-gray-200">
  {!collapsed && (
    <h1 className="text-2xl font-extrabold font-brand tracking-tight text-gray-900">
      Artiq
    </h1>
  )}
  <button
    onClick={toggleSidebar}
    className="p-2 rounded hover:bg-gray-100 transition"
  >
    <Bars3Icon className="h-5 w-5 text-gray-700" />
  </button>
</div>


                {!collapsed && (
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                        </div>
                    </div>
                )}

                <nav className="flex-1 p-2 overflow-y-auto">
                    <ul className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active = location.pathname === item.path;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => navigate(item.path)}
                                        className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${active
                                                ? "bg-gray-100 text-gray-900 border-l-4 border-gray-900"
                                                : "hover:bg-gray-100 hover:text-gray-900 text-gray-600"
                                            } ${collapsed ? "justify-center" : ""}`}
                                        title={collapsed ? item.label : ""}
                                    >
                                        <Icon className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />
                                        {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className={`flex items-center ${collapsed ? "justify-center" : ""}`}>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <UserCircleIcon className="w-5 h-5 text-gray-700" />
                        </div>
                        {!collapsed && (
                            <div className="ml-3">
                                <p className="text-sm font-medium">Ahmad Fauzi Ridwan</p>
                                <p className="text-xs text-gray-500">support@fauzi.biz.id</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{getCurrentPage()}</h2>
                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 rounded hover:bg-gray-100">
                            <BellIcon className="w-5 h-5 text-gray-700" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <UserCircleIcon className="w-5 h-5 text-gray-700" />
                            </div>
                            <span className="text-sm font-medium">Ahmad Fauzi Ridwan</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-auto bg-gray-50">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
