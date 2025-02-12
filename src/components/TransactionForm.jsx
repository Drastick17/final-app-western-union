import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransactionForm = () => {
  const navigate = useNavigate();

  // Estados para el formulario
  const [selectedCountry, setSelectedCountry] = useState('');
  const [formData, setFormData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');

  // Función para manejar los campos visibles según el país
  const getVisibleFields = () => {
    const requirements = {
      Colombia: ['Nombre Remitente', 'Nombre Destinatario', 'Email', 'Teléfono', 'Dirección', 'Número de Cuenta', 'Código de País'],
      Perú: ['Nombre Remitente', 'Nombre Destinatario', 'Email', 'Teléfono', 'Número de Cuenta', 'Código de País', 'Código Postal', 'Destino Descripción'],
      Chile: ['Nombre Remitente', 'Nombre Destinatario', 'Email', 'Número de Cuenta', 'Código de País'],
      Argentina: ['Nombre Remitente', 'Nombre Destinatario', 'Email', 'Número de Cuenta', 'Código de País'],
      Paraguay: ['Nombre Remitente', 'Nombre Destinatario', 'Email', 'Teléfono', 'Número de Cuenta', 'Código de País', 'Código Postal', 'Destino Descripción'],
      Uruguay: ['Nombre Remitente', 'Nombre Destinatario', 'Email', 'Teléfono', 'Número de Cuenta', 'Código de País'],
      Brasil: ['Nombre Remitente', 'Nombre Destinatario', 'Email', 'Dirección', 'Número de Cuenta', 'Código de País', 'Código Postal'],
    };

    const commonFields = ['Monto de Transacción', 'Método de Pago'];

    return requirements[selectedCountry] ? [...requirements[selectedCountry], ...commonFields] : commonFields;
  };

  const visibleFields = getVisibleFields();

  // Manejar cambios en los campos del formulario
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validar que todos los campos visibles estén completos
  const isFormComplete = () => {
    return visibleFields.every((field) => formData[field] && formData[field].trim() !== '');
  };

  // Manejar el botón de "Continuar"
  const handleContinue = () => {
    if (!isFormComplete()) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (paymentMethod === 'Paypal') {
      // Inicializar PayPal
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: formData['Monto de Transacción'], // Monto del formulario
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert(`Transacción completada por ${details.payer.name.given_name}`);
              navigate('/'); // Redirigir al inicio después de la transacción
            });
          },
          onError: (err) => {
            console.error('Error en la transacción:', err);
            alert('Ocurrió un error durante la transacción. Inténtelo de nuevo.');
          },
        })
        .render('#paypal-button-container');
    } else {
      alert('Método de pago no implementado aún.');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h1>Datos del Envío</h1>
      <p>Complete los datos para realizar su transacción de forma segura</p>
      <form style={formStyle}>
        {/* Selector de País */}
        <select
          required
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="" disabled>
            Seleccione un país*
          </option>
          <option value="Colombia">Colombia</option>
          <option value="Perú">Perú</option>
          <option value="Chile">Chile</option>
          <option value="Argentina">Argentina</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Brasil">Brasil</option>
        </select>

        {/* Campos dinámicos */}
        {visibleFields.map((field) => {
          if (field === 'Método de Pago') {
            return (
              <select
                key={field}
                required
                value={paymentMethod}
                onChange={(e) => {
                  handleInputChange(field, e.target.value);
                  setPaymentMethod(e.target.value);
                }}
              >
                <option value="" disabled>
                  Seleccione el Método de Pago*
                </option>
                <option value="Paypal">Paypal</option>
                <option value="Tarjeta de Credito/Debito">
                  Tarjeta de Credito/Debito
                </option>
              </select>
            );
          }

          return (
            <input
              key={field}
              type={field === 'Monto de Transacción' ? 'number' : 'text'}
              placeholder={`${field}*`}
              step="0.01"
              required
              onChange={(e) => handleInputChange(field, e.target.value)}
            />
          );
        })}

        {/* Botón Continuar */}
        <div style={buttonGroupStyle}>
          <button
            type="button"
            style={buttonStyle}
            onClick={handleContinue}
          >
            Continuar
          </button>
          <button
            type="button"
            style={{ ...buttonStyle, backgroundColor: 'red' }}
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
        </div>

        {/* Contenedor del botón de PayPal */}
        <div id="paypal-button-container" style={{ marginTop: '1rem' }}></div>
      </form>
    </div>
  );
};

// Estilos
const formContainerStyle = {
  maxWidth: '500px',
  margin: '0 auto',
  padding: '2rem',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const buttonGroupStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonStyle = {
  padding: '0.8rem 1.5rem',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#646cff',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default TransactionForm;
