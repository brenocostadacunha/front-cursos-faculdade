import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../data/auth';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate('/login');
  };

  return (
    <div className="d-flex" style={{ height: '100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="mb-5">Página Inicial</h1>
      <p className="mb-4">Bem-vindo à página inicial!</p>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/login" className="btn" style={{ 
          backgroundColor: 'var(--primary-color)', 
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          textDecoration: 'none'
        }}>
          Ir para Login
        </Link>
        
        <button 
          onClick={handleLogout}
          className="btn" 
          style={{ 
            backgroundColor: '#dc3545', 
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage; 