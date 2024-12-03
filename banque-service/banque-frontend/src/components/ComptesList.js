import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_COMPTES } from '../graphql/queries';
import { DELETE_COMPTE } from '../graphql/mutations';
import TransactionsList from './TransactionsList'; // Assurez-vous d'avoir ce composant pour afficher les transactions

function ComptesList() {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);
  const [deleteCompte] = useMutation(DELETE_COMPTE, {
    refetchQueries: [{ query: GET_ALL_COMPTES }],
  });
  const [selectedCompteId, setSelectedCompteId] = useState(null); // Etat pour le compte sélectionné

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      await deleteCompte({ variables: { id } });
      alert('Compte supprimé avec succès.');
    }
  };

  const totalSolde = data.allComptes.reduce((acc, compte) => acc + compte.solde, 0);
  const moyenneSolde = totalSolde / data.allComptes.length;

  // Fonction pour sélectionner un compte et afficher ses transactions
  const handleSelectCompte = (compteId) => {
    setSelectedCompteId(compteId);
  };

  return (
    <div>

      <h2>Liste des Comptes</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data.allComptes.map((compte) => (
          <div
            key={compte.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '20px',
              backgroundColor: '#fff',
              width: '250px',
            }}
          >
            <h3>Compte ID: {compte.id}</h3>
            <p>Solde: {compte.solde} €</p>
            <p>Date de création: {compte.dateCreation}</p>
            <p>Type: {compte.type}</p>

            {/* Bouton de suppression */}
            <button
              style={{
                backgroundColor: '#e74c3c',
                color: '#fff',
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleDelete(compte.id)}
            >
              Supprimer
            </button>

            {/* Bouton pour afficher les transactions */}
            <button
              style={{
                backgroundColor: '#3498db',
                color: '#fff',
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                marginTop: '10px',
              }}
              onClick={() => handleSelectCompte(compte.id)} // Sélectionner le compte pour afficher les transactions
            >
              Voir les transactions
            </button>
          </div>
        ))}
      </div>

      {/* Afficher les transactions du compte sélectionné */}
      {selectedCompteId && (
        <div style={{ marginTop: '20px' }}>
          <h2>Transactions du Compte ID: {selectedCompteId}</h2>
          <TransactionsList compteId={selectedCompteId} /> {/* Passer l'ID du compte aux transactions */}
        </div>
      )}

      {/* Statistiques */}
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f8ff', borderRadius: '10px' }}>
        <p>Nombre total de comptes : {data.allComptes.length}</p>
        <p>Somme des soldes : {totalSolde} €</p>
        <p>Moyenne des soldes : {moyenneSolde.toFixed(2)} €</p>
      </div>
    </div>
  );
}

export default ComptesList;
