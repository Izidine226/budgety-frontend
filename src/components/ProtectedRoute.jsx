import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    // Si l'utilisateur n'est pas authentifié, on le redirige vers la page de connexion
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur est authentifié, on affiche le contenu de la page demandée
  return children;
};

export default ProtectedRoute;