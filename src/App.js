// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Navbar from './components/nav/Navbar';
import Home from './components/Home/Home';
import PrivateRoutes from './routes/PrivateRoutes';
import MembershipPage from './components/MembershipPage';

function App() { 
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <Routes>
        <Route path='/account/login' element={<Login />} />
        <Route path='/account/signup' element={<Signup />} />
        
        {/* Private routes wrapped in /private */}
        <Route path='/private' element={<PrivateRoutes />}>
          <Route index element={<Home />} />
          <Route path='membership' element={<MembershipPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
