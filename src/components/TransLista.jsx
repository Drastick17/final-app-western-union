import  { useState, useEffect } from "react";
import { getTransactions } from "../api";

export default function TransLista() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTransactions();
        setData(response.transferencias || []); // Asegurar que sea un array válido
      } catch (error) {
        console.error("Error al obtener transferencias:", error);
      }
    }
    fetchData();
  }, []);

  // Función para obtener un estado aleatorio
  const getRandomEstado = () => {
    const estados = ["Éxito", "Fallido", "En espera"];
    return estados[Math.floor(Math.random() * estados.length)];
  };

  // Función para asignar colores según el estado
  const getEstadoStyle = (estado) => {
    switch (estado) {
      case "Éxito":
        return { backgroundColor: "#4CAF50", color: "white" }; // Verde
      case "Fallido":
        return { backgroundColor: "#F44336", color: "white" }; // Rojo
      case "En espera":
        return { backgroundColor: "#FFC107", color: "black" }; // Amarillo
      default:
        return {};
    }
  };

  return (
    <div style={{ width:"100vh" ,padding: "20px", display: "flex", justifyContent: "center" }}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Monto</th>
            <th>Remitente</th>
            <th>Destinatario</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((trans, index) => {
              const estado = getRandomEstado();
              return (
                <tr key={index}>
                  <td>${trans.monto.toFixed(2)}</td>
                  <td>{trans.remitente.nombre}</td>
                  <td>{trans.destinatario.nombre}</td>
                  <td style={{ ...styles.estado, ...getEstadoStyle(estado) }}>{estado}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">No hay transferencias disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Estilos en un objeto JS
const styles = {
  table: {
    width: "80%",
    borderCollapse: "collapse",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #ddd",
  },
  estado: {
    fontWeight: "bold",
    textTransform: "capitalize",
    padding: "8px",
  },
};

