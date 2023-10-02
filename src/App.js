import logo from './assets/logo.png';
import './App.css';
import SignedLayout from './ui/layouts/SignedLayout'
import UnSignedLayout from './ui/layouts/UnsignedLayout'
import SplashScreen from './ui/containers/SplashScreen';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogsViewContainer from './ui/containers/LogsViewContainer';

function App() {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      navigate('/home');
    }
  }, [navigate]);

  return loading ? <SplashScreen /> : <MainScreen />;

}
export default App;


function MainScreen() {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  return (
    <div className='transition transition-duration-500'>
      {isAuthenticated ? (
        <Routes>
          <Route path='/' element={<SignedLayout />}>
            <Route index path='/home' />
            <Route path='/home/*' />
            <Route path='/stage/*' />
            <Route path='/inbox/*' />
            <Route path='bytes/:postId' element={<LogsViewContainer />} />
          </Route>
          <Route path='*' element={<UnSignedLayout children={<Notfound/>}/>} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<UnSignedLayout />}>
            <Route index path='/home' />
            <Route path='/home/*' />
            <Route path='bytes/:postId' element={<LogsViewContainer />} />
          </Route>
          <Route path='*' element={<UnSignedLayout children={<Notfound/>}/>} />
        </Routes>
      )}
    </div>
  )
}


function Notfound() {
  return (
    <div className='text-primary text-2xl bg-secondary h-screen flex justify-center items-center'>
      <div className='opacity-50 items-center flex h-fit'>
      <img src={logo} className='w-10 h-10'/>
      <p className='font-bold'>Not found</p>
      </div>
      </div>
  )
}