import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Set axios headers and get user data when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      getUserData();
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const getUserData = async () => {
    try {
      const { data } = await axios.get('/api/auth/me');
      setUser(data);
    } catch (error) {
      logout();
    }
  };

  const register = async (formData) => {
    const { data } = await axios.post('/api/auth/register', formData);
    setToken(data.token);
    localStorage.setItem('token', data.token);
  };

  const login = async (formData) => {
    const { data } = await axios.post('/api/auth/login', formData);
    setToken(data.token);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;