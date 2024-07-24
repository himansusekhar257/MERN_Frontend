import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
    <nav style={{backgroundColor: "black", borderRadius: 2, padding: 3}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <h3 style={{color: "white", cursor:'pointer'}} onClick={()=>navigate('/')}>Himansu</h3>
        <h3 style={{color: "white", cursor:'pointer'}} onClick={()=>navigate('/private/membership')}>Membership</h3>

        <div style={{display: "flex",gap: 2, alignItems: "center"}}>
          <Link to="/account/login" style={{color: "white"}}>Login</Link>
          <Link to="/account/signup" style={{color: "white"}}>Signup</Link>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;