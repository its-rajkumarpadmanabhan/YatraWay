import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
  });

  // Attach token to requests
  api.interceptors.request.use((config) => {
    const tokens = JSON.parse(localStorage.getItem('authTokens'));
    if (tokens) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  });

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', {
        username: email, // Assuming username is email in your backend, adjust if different
        password,
      });
      if (response.status === 200) {
        setAuthTokens(response.data);
        localStorage.setItem('authTokens', JSON.stringify(response.data));
        // We'll fetch user details next or decode JWT, but let's just trigger a re-fetch
        fetchUser(response.data.access);
        navigate('/dashboard');
        return true;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const registerUser = async (userData) => {
    try {
      // Backend expects User creation via /api/users/
      const response = await axios.post('http://localhost:8000/api/users/', userData);
      if (response.status === 201) {
        // Automatically log them in after registration, or route to login
        navigate('/login');
        return true;
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  };

  const fetchUser = async (token) => {
    try {
      // Usually you hit a /me/ endpoint or decode token.
      // Since we don't have a specific /me/ endpoint documented, we can decode JWT or just store minimal state.
      // For now, let's just set some dummy user or decode if needed.
      // We will need to create a /me endpoint in Django if we want full details.
      setUser({ authenticated: true });
    } catch (error) {
      logoutUser();
    }
  };

  useEffect(() => {
    if (authTokens) {
      fetchUser(authTokens.access);
    }
    setLoading(false);
  }, []);

  const contextData = {
    user,
    authTokens,
    loginUser,
    registerUser,
    logoutUser,
    api,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
