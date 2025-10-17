import React, { useState, useContext } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); 



 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        loginData
      );
     login(response.data.token);
      console.log('Connexion réussie ! Token :', response.data.token);

    } catch (error) {
      if (error.response) {
        console.error('Erreur de connexion :', error.response.data.msg);
      } else {
        console.error('Erreur de connexion :', error.message);
      }
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        {/* ... Le reste du formulaire ne change pas ... */}
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p>
        Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link>
      </p>
    </div>
  );
}

export default LoginPage;