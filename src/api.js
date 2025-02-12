import axios from 'axios';

const API_URL = 'http://167.99.146.213/api'; // Cambia la URL según la dirección de tu backend.

export const getTransactions = async () => {
    try {
        const response = await axios.get(`${API_URL}/transactions`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las transacciones:', error);
        throw error;
    }
};
