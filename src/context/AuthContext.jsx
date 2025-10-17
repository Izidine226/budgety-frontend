import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. On crée le contexte
const AuthContext = createContext();

// 2. On crée le "Fournisseur" du contexte
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); 
    navigate('/'); 
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };