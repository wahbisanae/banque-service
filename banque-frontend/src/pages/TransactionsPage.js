import React, { useState } from 'react';
import AddTransaction from '../components/AddTransaction';
import TransactionsList from '../components/TransactionsList';

function TransactionsPage() {
  const [compteId, setCompteId] = useState(null);

  const handleCompteChange = (event) => {
    setCompteId(event.target.value);
  };

  return (
    <div>
      <h2>Gestion des Transactions</h2>
      {/* Ajouter une transaction */}
      <h3>Ajouter une Transaction</h3>
      <AddTransaction />

      {/* Filtrer par compte */}
      <div>
        <label>
          ID du Compte :
          <input
            type="number"
            value={compteId || ''}
            onChange={handleCompteChange}
            placeholder="ID Compte"
            style={{ marginLeft: '10px' }}
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
