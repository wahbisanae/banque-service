import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ComptesPage from './pages/ComptesPage';
import TransactionsPage from './pages/TransactionsPage';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f0' }}>
        {/* Navigation */}
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px',
            background: '#4a90e2',
            borderRadius: '5px',
            color: 'white',
          }}
        >
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '10px',
              borderRadius: '5px',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#00bfff'}
            onMouseOut={(e) => e.target.style.backgroundColor = ''}
          >
            Gestion des Comptes
          </Link>
          <Link
            to="/transactions"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '10px',
              borderRadius: '5px',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#00bfff'}
            onMouseOut={(e) => e.target.style.backgroundColor = ''}
          >
            Gestion des Transactions
          </Link>
        </nav>

        {/* Définition des routes */}
        <Routes>
          <Route path="/" element={<ComptesPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
