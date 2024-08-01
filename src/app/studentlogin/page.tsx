// Ensure this directive is at the top of your component file
"use client";

import React from 'react';
import './studentlogin.scss';

const StudentLogin = () => {

  const handleGoogleLogin = () => {
    // Redirect to the login URL
    const googleLoginUrl = 'https://demo4-backend.vercel.app/login';
    window.location.href = googleLoginUrl;
  };

  return (
    <div className="student-login-container">
      <h2>Ready to take the next step?</h2>
      <p>Create an account or sign in.</p>
      <p>
        By creating an account or signing in, you understand and agree to Indeeds
        <a href="#"> Terms</a>. You also consent to our
        <a href="#"> Cookie and Privacy</a> policies. You will receive
        marketing messages from Indeed and may opt out at any time by following
        the unsubscribe link in our messages, or as detailed in our terms.
      </p>
      <div className="login-options">
        <button className="google-login" onClick={handleGoogleLogin}>
          <img src="google-logo.png" alt="Google logo" />
          Continue with Google
        </button>
        <button className="apple-login">
          <img src="apple-logo.png" alt="Apple logo" />
          Continue with Apple
        </button>
        <div className="divider">or</div>
        <input type="text" placeholder="youremail@email.com or 9876543210" />
        <button className="continue-btn">Continue</button>
      </div>
      <p className="footer-text">
        By continuing, you agree to receive job opportunities from Compliance Frontiers.
      </p>
    </div>
  );
};

export default StudentLogin;
