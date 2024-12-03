import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_TRANSACTIONS = gql`
  query GetTransactions($compteId: ID!) {
    compteTransactions(compteId: $compteId) {
      id
      montant
      type
      date
    }
  }
`;

const TransactionsList = ({ compteId }) => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: { compteId },
  });

  if (loading) return <p>Chargement des transactions...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      {/* Suppression du titre redondant ici */}
      <ul>
        {data.compteTransactions.length > 0 ? (
          data.compteTransactions.map((transaction) => (
            <li key={transaction.id} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
              <span style={{ fontWeight: 'bold' }}>{transaction.type}</span> - {transaction.montant} € - <span>{transaction.date}</span>
            </li>
          ))
        ) : (
          <p>Aucune transaction trouvée pour ce compte.</p>
        )}
      </ul>
    </div>
  );
};

export default TransactionsList;
