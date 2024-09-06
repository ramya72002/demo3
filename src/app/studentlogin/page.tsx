// Ensure this directive is at the top of your component file
"use client";
import Header from '../header/page';
import React from 'react';
import './studentlogin.scss';

const StudentLogin = () => {

  const handleGoogleSignIn = () => {
    window.location.href = 'https://demo4-backendurl.vercel.app/login';
  };

  return (
    <div>
      <Header />
      <div className="signin-page">
        <main className="signin-content">
          <h1>FIND OPPORTUNITIES WITH US</h1>
          <div className="signin-form">
            <h2>Ready to take the next step?</h2>
            <p>Create an account or sign in.</p>
            <p className="terms">
              By creating an account or signing in, you understand and agree to our <a href="#">Terms</a>. 
              You also consent to our <a href="#">Cookie</a> and <a href="#">Privacy</a> policies. 
              You will receive marketing messages and may opt out at any time by following the unsubscribe link in our messages, 
              or as detailed in our terms.
            </p>

            <button className="google-btn" onClick={handleGoogleSignIn}>
              <img src="/images/google-logo.png" alt="Google logo" />
              Continue with Google
            </button>

            <button className="apple-btn">
              <img src="/images/apple-logo.png" alt="Apple logo" />
              Continue with Apple
            </button>

            <div className="divider">or</div>

            <div className="email-section">
              <label>Email address or phone number *</label>
              <input type="text" placeholder="youremail@email.com or 9876543210" />
              <small>If using a phone number, make sure that it is eligible to receive both WhatsApp and SMS messages.</small>
            </div>

            <button className="continue-btn">Continue</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLogin;
