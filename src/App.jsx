// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from '@/components/ui/sonner';
// import DashboardLayout from '@/components/layout/DL';
// import PostsList from '@/components/posts/PostsList';
// import CreatePost from '@/components/posts/CreatePost';
// import EditPost from '@/components/posts/EditPost';
// import { PostProvider } from '@/context/PostProvider';
// import './App.css';
// import Home from './pages/Home';
// import About from './pages/About';

// function App() {
//   return (
//     <PostProvider>
//       <Router>
//         <div className="min-h-screen bg-background">
//           <Routes>
//             {/* <Route path="/" element={<DashboardLayout />}>
//               <Route index element={<PostsList />} />
//               <Route path="posts" element={<PostsList />} />
//               <Route path="posts/create" element={<CreatePost />} />
//               <Route path="posts/edit/:id" element={<EditPost />} />
//             </Route> */}
//             <Route path='/' element={<Home />} />
//             <Route path="/about" element={<About />} />
//           </Routes>
//           <Toaster />
//         </div>
//       </Router>
//     </PostProvider>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "./pages/Home";
import PostsPage from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

// Default page untuk routes yang belum diimplementasi
const DefaultPage = ({ pageName }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
      {pageName} Page
    </h3>
    <p className="text-gray-600">
      This is the {pageName} page. Content will be implemented here.
    </p>
  </div>
);

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/edit/:id" element={<EditPost />} />
          <Route path="/users" element={<DefaultPage pageName="Users" />} />
          <Route path="/analytics" element={<DefaultPage pageName="Analytics" />} />
          <Route path="/calendar" element={<DefaultPage pageName="Calendar" />} />
          <Route path="/mail" element={<DefaultPage pageName="Mail" />} />
          <Route path="/settings" element={<DefaultPage pageName="Settings" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
