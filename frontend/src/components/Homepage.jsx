import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'farmer@example.com' && password === 'password') {
      localStorage.setItem('token', 'demo-token');
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use farmer@example.com / password');
    }
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🌾 Welcome to Farmigo</h1>
          <p className="hero-subtitle">
            Empowering farmers with smart tools, real-time weather insights, and a thriving community
          </p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">🌤️</span>
              <span>Weather Forecasting</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔧</span>
              <span>Tool Rentals</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💰</span>
              <span>Marketplace</span>
            </div>
            <div className="feature">
              <span className="feature-icon">👥</span>
              <span>Community Support</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop" alt="Farm landscape" />
        </div>
      </section>

      {/* Login Section */}
      <section className="login-section">
        <div className="login-container">
          <h2>Get Started</h2>
          <p>Join thousands of farmers already using Farmigo</p>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">Login to Dashboard</button>
          </form>
          <p className="demo-note">Demo: farmer@example.com / password</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Farmigo?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="card-icon">📊</div>
            <h3>Real-time Weather</h3>
            <p>Get accurate weather forecasts and crop recommendations based on local conditions.</p>
          </div>
          <div className="feature-card">
            <div className="card-icon">🛠️</div>
            <h3>Equipment Rentals</h3>
            <p>Access affordable farming equipment and tools from local providers.</p>
          </div>
          <div className="feature-card">
            <div className="card-icon">🛒</div>
            <h3>Smart Marketplace</h3>
            <p>Buy and sell fertilizers, pesticides, and other farming supplies easily.</p>
          </div>
          <div className="feature-card">
            <div className="card-icon">🤝</div>
            <h3>Community Threads</h3>
            <p>Connect with other farmers, share experiences, and get help with crop issues.</p>
          </div>
          <div className="feature-card">
            <div className="card-icon">📱</div>
            <h3>Offline Ready</h3>
            <p>Works even without internet connection, perfect for remote farm locations.</p>
          </div>
          <div className="feature-card">
            <div className="card-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your farming data stays private and secure with enterprise-grade protection.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Transform Your Farming?</h2>
        <p>Join the Farmigo community today and discover how technology can help you grow better.</p>
        <button onClick={() => document.querySelector('.login-section').scrollIntoView({ behavior: 'smooth' })} className="cta-btn">
          Get Started Now
        </button>
      </section>
    </div>
  );
};

export default Homepage;
