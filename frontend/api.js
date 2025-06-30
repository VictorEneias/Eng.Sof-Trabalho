const API_URL = "http://localhost:8000";

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function logout() {
  localStorage.removeItem('token');
}

export async function api(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = 'Bearer ' + token;
  
  const res = await fetch(API_URL + path, { ...options, headers });
  
  if (!res.ok) {
    let errorMessage = `Erro ${res.status}`;
    try {
      const errorData = await res.json();
      if (errorData.detail) {
        errorMessage = errorData.detail;
      }
    } catch (e) {
      // Se não conseguir parsear JSON, usa o texto da resposta
      try {
        errorMessage = await res.text();
      } catch (e2) {
        // Se não conseguir nem texto, usa mensagem padrão
        errorMessage = `Erro ${res.status}: ${res.statusText}`;
      }
    }
    throw new Error(errorMessage);
  }
  
  if (res.status === 204) return null;
  return res.json();
}
