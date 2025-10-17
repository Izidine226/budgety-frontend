import React, { useState, useContext } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; 

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState(''); 
  
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const newUser = { email, password };

      const response = await axios.post(
        'http://localhost:5000/api/users/register',
        newUser
      );

      
      login(response.data.token);

    } catch (err) {
    
      if (err.response) {
        setError(err.response.data.msg); 
      } else {
        setError("Erreur de connexion : Le serveur ne répond pas.");
      }
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* On affiche le message d'erreur s'il existe */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit">S'inscrire</button>
      </form>
      <p>
        Déjà un compte ? <Link to="/login">Connectez-vous</Link>
      </p>
    </div>
  );
}

export default RegisterPage;