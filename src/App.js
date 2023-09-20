import logo from './logo.svg';
import './App.css';
import EmptyPage from './lib/pages/EmptyPage';
import Homepage from './lib/pages/HomePage';
import ContentPage from './lib/pages/ContentPage';
import AdminPage from './lib/pages/AdminPage';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginPage from './lib/pages/AdminLoginPage';
import AddPostPage from './lib/pages/AddPostPage';
import SearchPage from './lib/pages/SearchPage';

function App() {
  const isAuthenticated = /* implement your authentication logic here */ false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contents/item/:itemId" element={<ContentPage />} />
        <Route path="/contents/addPost" element={<AddPostPage/>}/>
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

