import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Transactions from './components/Transactions';
import TransactionForm from './components/TransactionForm';
import TransLista from './components/TransLista';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Ruta principal con la lista de transacciones */}
        <Route path="/" element={<Transactions />} />
        {/* Ruta para el formulario */}
        <Route path="/form" element={<TransactionForm />} />

        <Route path="/transferencias" element={<TransLista/>} />
      </Routes>
    </>
  );
}

export default App;
