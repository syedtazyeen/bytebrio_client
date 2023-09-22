import logo from './logo.svg';
import './App.css';
import EmptyPage from './lib/pages/EmptyPage';
import BlogsPage from './lib/pages/BlogsPage';
import ContentPage from './lib/pages/ContentPage';
import AdminPage from './lib/pages/AdminPage';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginPage from './lib/pages/AdminLoginPage';
import AddPostPage from './lib/pages/AddPostPage';
import SearchPage from './lib/pages/SearchPage';
import LoginPage from './lib/pages/LoginPage';
import CreateQuizPage from './lib/pages/CreateQuizPage';
import LandingPage from './lib/pages/LandingPage';
import SkillsPage from './lib/pages/SkillsPage';
import AddBlogPost, { AddBlogPage } from './lib/pages/AddBlogPage';

function App() {
  const isAuthenticated = /* implement your authentication logic here */ false;

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/create-quiz" element={<CreateQuizPage />} />
        <Route path="/contents/item/:itemId" element={<ContentPage />} />
        <Route path="/contents/addPost" element={<AddPostPage/>}/>
        <Route path="/contents/addBlog" element={<AddBlogPage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/admin" element={isAuthenticated ? <AdminPage /> : <Navigate to="/adminLogin" />} />
        <Route path="/adminLogin" element={<AdminLoginPage />} />
        {/* Catch-all route for all other paths */}
        <Route path="*" element={<EmptyPage />} />
        <Route path="contents/*" element={<EmptyPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

