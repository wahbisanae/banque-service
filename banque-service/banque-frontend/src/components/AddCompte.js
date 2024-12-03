import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_COMPTE } from '../graphql/mutations';
import { GET_ALL_COMPTES } from '../graphql/queries';

function AddCompte() {
  const [formData, setFormData] = useState({ solde: '', dateCreation: '', type: 'COURANT' });
  const [saveCompte] = useMutation(SAVE_COMPTE, {
    refetchQueries: [{ query: GET_ALL_COMPTES }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveCompte({ variables: { compte: formData } });
    alert('Compte ajouté avec succès !');
    setFormData({ solde: '', dateCreation: '', type: 'COURANT' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Supprimer l'en-tête */}
      {/* <h2>Créer un Nouveau Compte</h2> */}

      <input
        type="number"
        placeholder="Solde"
        value={formData.solde}
        onChange={(e) => setFormData({ ...formData, solde: parseFloat(e.target.value) })}
        required
        style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
      />
      <input
        type="date"
        value={formData.dateCreation}
        onChange={(e) => setFormData({ ...formData, dateCreation: e.target.value })}
        required
        style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
      />
      <select
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
      >
        <option value="COURANT">Courant</option>
        <option value="EPARGNE">Épargne</option>
      </select>
      <button type="submit" style={{ backgroundColor: '#00bfff', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Ajouter
      </button>
    </form>
  );
}

export default AddCompte;
