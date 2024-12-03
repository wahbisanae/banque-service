import React, { useState } from 'react';
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
  const { loading, error, data } = useQuery(GET_COMPTES);
  const [addTransaction] = useMutation(ADD_TRANSACTION);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!compteId || !montant || !date || !type) {
      alert('Tous les champs doivent être remplis');
      return;
    }

    addTransaction({
      variables: {
        transactionRequest: {
          compteId: parseInt(compteId),
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

  // Styles en ligne
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    label: {
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ajouter une Transaction</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div>
          <label style={styles.label}>Compte:</label>
          <select
            style={styles.input}
            value={compteId}
            onChange={(e) => setCompteId(e.target.value)}
          >
            <option value="">Sélectionner un compte</option>
            {data.allComptes.map((compte) => (
              <option key={compte.id} value={compte.id}>
                Compte {compte.id} ({compte.type} - Solde: {compte.solde}€)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={styles.label}>Montant:</label>
          <input
            style={styles.input}
            type="number"
            step="0.01"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            required
          />
        </div>

        <div>
          <label style={styles.label}>Date:</label>
          <input
            style={styles.input}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label style={styles.label}>Type de transaction:</label>
          <select
            style={styles.input}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="DEPOT">Dépôt</option>
            <option value="RETRAIT">Retrait</option>
          </select>
        </div>

        <button style={styles.button} type="submit">
          Ajouter la transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
