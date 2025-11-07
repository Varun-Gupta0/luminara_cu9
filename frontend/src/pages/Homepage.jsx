// src/pages/Homepage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Homepage.module.css'; // <-- Import CSS Module
import {
  FiSun,
  FiTool,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiMessageSquare,
  FiWifiOff,
  FiLock
} from 'react-icons/fi'; // <-- Import nice icons
import Spline from '@splinetool/react-spline'; // <-- 1. Import Spline

const Homepage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!isLogin && (!name || !confirmPassword)) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login
        const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        // Signup
        const response = await axios.post('http://localhost:4000/api/auth/register', { name, email, password });
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || `${isLogin ? 'Login' : 'Signup'} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.homepage}>
      {/* --- Full-screen Spline background --- */}
      <Spline
        className={styles.splineBackground}
        scene="https://prod.spline.design/cpjGeJctKtfL6Xwk/scene.splinecode"
      />



      {/* --- Hero Section --- */}
      <section className={styles.heroSection}>
        {/* --- Hero Content on top --- */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            🌾 Welcome to Farmigo
          </h1>
          <p className={styles.heroSubtitle}>
            Empowering farmers with smart tools, real-time weather insights, and a thriving community
          </p>
          <div className={styles.heroFeatures}>
            <div className={styles.feature}>
              <FiSun className={styles.featureIcon} />
              <span>Weather Forecasting</span>
            </div>
            <div className={styles.feature}>
              <FiTool className={styles.featureIcon} />
              <span>Tool Rentals</span>
            </div>
            <div className={styles.feature}>
              <FiShoppingCart className={styles.featureIcon} />
              <span>Marketplace</span>
            </div>
            <div className={styles.feature}>
              <FiUsers className={styles.featureIcon} />
              <span>Community Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Auth Section --- */}
      <section className={styles.loginSection} id="get-started">
        <div className={styles.loginContainer}>
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <p>Join thousands of farmers already using Farmigo.</p>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <form onSubmit={handleAuth} className={styles.loginForm}>
            {!isLogin && (
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            )}
            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                minLength={6}
              />
            </div>
            {!isLogin && (
              <div className={styles.formGroup}>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  required
                  minLength={6}
                />
              </div>
            )}
            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login to Dashboard' : 'Sign Up')}
            </button>
          </form>
          <p className={styles.demoNote}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{ background: 'none', border: 'none', color: 'var(--primary-green)', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className={styles.featuresSection}>
        <h2>Why Choose Farmigo?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FiBarChart2 /></div>
            <h3>Real-time Weather</h3>
            <p>Get accurate weather forecasts and crop recommendations based on local conditions.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FiTool /></div>
            <h3>Equipment Rentals</h3>
            <p>Access affordable farming equipment and tools from local providers.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FiShoppingCart /></div>
            <h3>Smart Marketplace</h3>
            <p>Buy and sell fertilizers, pesticides, and other farming supplies easily.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FiMessageSquare /></div>
            <h3>Community Threads</h3>
            <p>Connect with other farmers, share experiences, and get help with crop issues.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FiWifiOff /></div>
            <h3>Offline Ready</h3>
            <p>Works even without internet connection, perfect for remote farm locations.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FiLock /></div>
            <h3>Secure & Private</h3>
            <p>Your farming data stays private and secure with enterprise-grade protection.</p>
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className={styles.ctaSection}>
        <h2>Ready to Transform Your Farming?</h2>
        <p>Join the Farmigo community today and discover how technology can help you grow better.</p>
        <button
          onClick={() => document.getElementById('get-started').scrollIntoView({ behavior: 'smooth' })}
          className={styles.ctaBtn}
        >
          Get Started Now
        </button>
      </section>
    </div>
  );
};

export default Homepage;
