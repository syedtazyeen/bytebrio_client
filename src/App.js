import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import EmptyPage from './lib/pages/EmptyPage';
import Homepage from './lib/pages/HomePage';
import ContentPage from './lib/pages/ContentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/contents/:itemId" element={<ContentPage/>} />
        <Route path="/contents/post"  />

        {/* Catch-all route for all other paths */}
        <Route path="*" element={<EmptyPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
