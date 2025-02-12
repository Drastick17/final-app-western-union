import axios from 'axios'


const API_URL = 'http://167.99.146.213:8080' // Cambia la URL según la dirección de tu backend.

export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transferencia/list`)
    return response.data
  } catch (error) {
    console.error('Error al obtener las transacciones:', error)
    throw error
  }
}

export const postTransactions = async (body) => {
  try {
    body.remitente = {
      nombre: body['Nombre Remitente'],
      email: body['Email'],
      telefono: body['Teléfono'],
      direccion: body['Dirección']
    }

    body.destinatario = {
      nombre: body['Nombre Destinatario'],
      pais: body['Código de País'],
      numeroCuenta: body['Número de Cuenta'],
      codigoPais: 'CO',
      codigoPostal: body['Código Postal'],
      descripcionDestino: body['Destino Descripción']
    }


    const response = await axios.post(`${API_URL}/transferencia/banco`, {
      transferencia: {
        destinatario: body.destinatario,
        remitente: body.remitente,
      },
      metodoNotificacion: 'correo electrónico'
    })


    return response.data
  } catch (error) {
    console.error('Error al obtener las transacciones:', error)
    throw error
  }
}
