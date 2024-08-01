'use client'
import React from 'react';
import './loginHeader.scss';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/studentlogin');
  };
  return (
    <header className="header">
      <div className="login-signin">
        <button onClick={handleClick} className="login-button">Login</button>
        <button className="signin-button">Sign In</button>
      </div>
    </header>
  );
};

export default Header;

