// Trong component LoginPage
import React from 'react';
import Login from '../components/Login';

const LoginPage = ({ setIsLoggedIn }) => {
  return (
    <div className='login_pages'>
      {/* Pass setIsLoggedIn prop to Login component */}
      <Login setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default LoginPage;