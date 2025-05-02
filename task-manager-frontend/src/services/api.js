const API_URL = import.meta.env.VITE_API_URL;

let token = localStorage.getItem("token");

export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem("token", token);
};

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");

  setToken(data.token);
  return data;
};

export const login = async (userData) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");

  setToken(data.token);
  return data;
};

export const getWithAuth = async (endpoint) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
