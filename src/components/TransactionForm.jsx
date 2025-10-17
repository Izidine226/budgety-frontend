import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const TransactionForm = ({ onTransactionAdded }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); 
  const [category, setCategory] = useState('');
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount || !category) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const newTransaction = {
      description,
      amount: parseFloat(amount),
      type,
      category,
    };

    try {
      const config = {
        headers: { 'x-auth-token': token },
      };

      const response = await axios.post(
        'http://localhost:5000/api/transactions',
        newTransaction,
        config
      );

      // Appelle la fonction du parent pour mettre à jour la liste
      onTransactionAdded(response.data);

      // Vide les champs du formulaire après succès
      setDescription('');
      setAmount('');
      setCategory('');
      setType('expense'); 
    } catch (error) {
      console.error("Erreur lors de l'ajout de la transaction", error.response?.data?.msg || error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: '20px 0',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
      }}
    >
      <h3>Ajouter :</h3>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Montant (€)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        step="0.01" // Permet les centimes
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Dépense</option>
        <option value="income">Revenu</option>
      </select>
      <input
        type="text"
        placeholder="Catégorie"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default TransactionForm;