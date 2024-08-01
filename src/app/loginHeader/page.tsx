import React from 'react';
import './loginHeader.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="login-signin">
        <button className="login-button">Login</button>
        <button className="signin-button">Sign In</button>
      </div>
    </header>
  );
};

export default Header;
