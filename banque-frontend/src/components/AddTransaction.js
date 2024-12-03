import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

// GraphQL Mutation pour ajouter une transaction
const ADD_TRANSACTION = gql`
  mutation addTransaction($transactionRequest: TransactionInput!) {
    addTransaction(transactionRequest: $transactionRequest) {
      id
      montant
      date
      type
      compte {
        id
        solde
      }
    }
  }
`;

// GraphQL Query pour récupérer les comptes
const GET_COMPTES = gql`
  query {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

const AddTransaction = () => {
  const [compteId, setCompteId] = useState('');
  const [montant, setMontant] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('DEPOT'); // 'DEPOT' par défaut
  const { loading, error, data } = useQuery(GET_COMPTES); // Utilisation de useQuery pour récupérer les comptes
  const [addTransaction] = useMutation(ADD_TRANSACTION);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier les données avant d'envoyer la mutation
    if (!compteId || !montant || !date || !type) {
      alert('Tous les champs doivent être remplis');
      return;
    }

    // Appel à la mutation GraphQL pour ajouter une transaction
    addTransaction({
      variables: {
        transactionRequest: {
          compteId: parseInt(compteId), // Assurez-vous de convertir les IDs
          montant: parseFloat(montant),
          date: date,
          type: type,
        },
      },
    })
      .then((response) => {
        console.log('Transaction ajoutée:', response.data.addTransaction);
        alert('Transaction ajoutée avec succès');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de la transaction:', error);
        alert('Une erreur est survenue lors de l\'ajout de la transaction.');
      });
  };

  if (loading) return <p>Chargement des comptes...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <div>
      <h2>Ajouter une Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Compte:</label>
          <select value={compteId} onChange={(e) => setCompteId(e.target.value)}>
            <option value="">Sélectionner un compte</option>
            {data.allComptes.map((compte) => (
              <option key={compte.id} value={compte.id}>
                Compte {compte.id} ({compte.type} - Solde: {compte.solde}€)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Montant:</label>
          <input
            type="number"
            step="0.01"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Type de transaction:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="DEPOT">Dépôt</option>
            <option value="RETRAIT">Retrait</option>
          </select>
        </div>

        <button type="submit">Ajouter la transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
