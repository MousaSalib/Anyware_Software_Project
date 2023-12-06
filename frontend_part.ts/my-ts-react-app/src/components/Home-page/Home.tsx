import React from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/auth/loginAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('User not found');
      }

      const data = await response.json();
      const { token } = data;

      localStorage.setItem('token', token);
      navigate("/dashboard");

      console.log('Token saved:', token);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='cont'>
      <h1 className='text-light mt-1'>Home page</h1>
      <button className='btn btn-outline-success w-25' onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Home;


