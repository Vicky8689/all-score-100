import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import '../../assets/bootstrap.min.css';

function AuthTabs() {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();  // Initialize the navigate function

  // Handle form submission for login
  const handleLogin = (e) => {
    e.preventDefault();  // Prevent the page from refreshing

    // Authentication logic here (for now, just navigate)
    navigate('/home');  // Redirect to the /home route after login
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#e0f7fa' }}>
      <div className="container p-4 shadow bg-white rounded" style={{ maxWidth: '450px' }}>
        {/* Tab Navigation */}
        <ul className="nav nav-pills nav-justified mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </li>
        </ul>

        {/* Content */}
        <div className="tab-content">
          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="tab-pane fade show active">
              <form onSubmit={handleLogin}>  {/* Form submission now calls handleLogin */}
                <h4 className="mb-3 text-center">Welcome Back</h4>

                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="UserId / Phone Number or Email"
                  />
                </div>

                <div className="form-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="small text-decoration-none">
                    Forgot password?
                  </a>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Sign In
                </button>

                <p className="text-center">
                  Not a member?{' '}
                  <span
                    role="button"
                    onClick={() => setActiveTab('register')}
                    className="text-primary"
                  >
                    Register
                  </span>
                </p>
              </form>
            </div>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <div className="tab-pane fade show active">
              <form>
                <h4 className="mb-3 text-center">Create Account</h4>

                <div className="form-group mb-3">
                  <input type="text" className="form-control" placeholder="First Name" />
                </div>

                <div className="form-group mb-3">
                  <input type="text" className="form-control" placeholder="Last Name" />
                </div>

                <div className="form-group mb-3">
                  <input type="tel" className="form-control" placeholder="Phone Number" />
                </div>

                <div className="form-group mb-3">
                  <input type="email" className="form-control" placeholder="Email" />
                </div>

                <div className="form-group mb-3">
                  <input type="password" className="form-control" placeholder="Password" />
                </div>

                <div className="form-check mb-3 text-center">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="termsCheck"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="termsCheck">
                    I agree to the terms and conditions
                  </label>
                </div>

                <button type="submit" className="btn btn-success w-100 mb-3">
                  Sign Up
                </button>

                <p className="text-center">
                  Already have an account?{' '}
                  <span
                    role="button"
                    onClick={() => setActiveTab('login')}
                    className="text-primary"
                  >
                    Login
                  </span>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthTabs;
