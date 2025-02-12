import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Transactions from './components/Transactions';
import TransactionForm from './components/TransactionForm';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Ruta principal con la lista de transacciones */}
        <Route path="/" element={<Transactions />} />
        {/* Ruta para el formulario */}
        <Route path="/form" element={<TransactionForm />} />
      </Routes>
    </>
  );
}

export default App;
