import React, { useState } from 'react';
import AddCompte from '../components/AddCompte';
import ComptesList from '../components/ComptesList';

function ComptesPage() {
  const [selectedCompteId, setSelectedCompteId] = useState(null);

  const handleCompteSelect = (compteId) => {
    setSelectedCompteId(compteId);
  };

  return (
    <div className="container">
      {/* Section pour ajouter un compte */}
      <AddCompte />

      {/* Section pour la liste des comptes */}
      <ComptesList onSelectCompte={handleCompteSelect} />
    </div>
  );
}

export default ComptesPage;
