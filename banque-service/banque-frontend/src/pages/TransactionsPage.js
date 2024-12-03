// src/pages/TransactionsPage.js

import React, { useState } from 'react';
import AddTransaction from '../components/AddTransaction';
import TransactionsList from '../components/TransactionsList';


// Assurez-vous que le chemin est correct

function TransactionsPage() {
  const [compteId, setCompteId] = useState(null);

  const handleCompteChange = (event) => {
    setCompteId(event.target.value);
  };

  return (
    <div className="transactions-page">
      <h2>Gestion des Transactions</h2>
      {/* Ajouter une transaction */}

      <AddTransaction />

      {/* Filtrer par compte */}
      <div className="filter-section">
        <label>
          ID du Compte :
          <input
            type="number"
            value={compteId || ''}
            onChange={handleCompteChange}
            placeholder="ID Compte"
          />
        </label>
      </div>

      {/* Liste des transactions */}
      {compteId ? (
        <TransactionsList compteId={compteId} />
      ) : (
        <p>Saisissez un ID de compte pour voir les transactions.</p>
      )}
    </div>
  );
}

export default TransactionsPage;
