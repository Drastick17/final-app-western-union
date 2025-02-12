import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Transacciones</h2>
      <p>Realiza Aquí Tus Transacciones</p>
      <button
        style={{
          marginTop: '1rem',
          padding: '0.8rem 1.5rem',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#646cff',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/form')}
      >
        Agregar Transacción
      </button>
    </div>
  );
};

export default Transactions;
