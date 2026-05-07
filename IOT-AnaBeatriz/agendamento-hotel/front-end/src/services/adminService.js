const API_URL = 'http://localhost:3000';

function getHeaders() {
  return {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };
}

// 📊 TODAS RESERVAS
export async function listarReservas() {
  const res = await fetch(`${API_URL}/reservas`, {
    headers: getHeaders()
  });

  return res.json();
}

// 📜 LOGS
export async function listarLogs() {
  const res = await fetch(`${API_URL}/logs`, {
    headers: getHeaders()
  });

  return res.json();
}