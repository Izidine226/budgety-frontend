import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import TransactionForm from '../components/TransactionForm';

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const config = { headers: { 'x-auth-token': token } };
        const response = await axios.get('https://insightful-clarity-production.up.railway.app/api/transactions', config);
        setTransactions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des transactions', error);
        if (error.response && error.response.status === 401) logout();
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, [token, logout]);

  const handleTransactionAdded = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette transaction ?")) {
      return;
    }
    try {
      const config = { headers: { 'x-auth-token': token } };
      await axios.delete(`https://insightful-clarity-production.up.railway.app/api/transactions/${id}`, config);
      setTransactions(transactions.filter((transaction) => transaction._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la transaction", error);
    }
  };
  
  //CALCULER LES TOTAUX 
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = totalIncome - totalExpense;


  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Tableau de bord</h1>
        <button onClick={logout}>Se déconnecter</button>
      </div>

      {/* --- 2. AFFICHER LE RÉSUMÉ --- */}
      <div className="summary-container">
        <div className="summary-card">
          <h4>Revenus Totaux</h4>
          <p className="income-amount">+{totalIncome.toFixed(2)} €</p>
        </div>
        <div className="summary-card">
          <h4>Dépenses Totales</h4>
          <p className="expense-amount">-{totalExpense.toFixed(2)} €</p>
        </div>
        <div className="summary-card">
          <h4>Solde Actuel</h4>
          <p className={balance >= 0 ? 'income-amount' : 'expense-amount'}>
            {balance.toFixed(2)} €
          </p>
        </div>
      </div>


      <TransactionForm onTransactionAdded={handleTransactionAdded} />

      <h2>Mes Transactions</h2>
      {transactions.length === 0 ? (
        <p>Aucune transaction pour le moment.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {transactions.map((transaction) => (
            <li
              key={transaction._id}
              style={{
                border: '1px solid #ccc',
                margin: '8px 0',
                padding: '12px',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>{transaction.description}</strong>
                <br />
                <small style={{ color: '#555' }}>{transaction.category}</small>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span
                  style={{
                    color: transaction.type === 'expense' ? 'red' : 'green',
                    fontWeight: 'bold',
                  }}
                >
                  {transaction.type === 'expense' ? '-' : '+'}
                  {transaction.amount.toFixed(2)} €
                </span>
                <button
                  onClick={() => handleDelete(transaction._id)}
                  style={{ backgroundColor: '#e74c3c' }}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashboardPage;