import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {
    const { loading, error, status } = useSelector((state) => state.auth);
    console.log("status ba", status);
  return (
    <div>Welcome</div>
  )
}

export default Home