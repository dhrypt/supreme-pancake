const API_URL = import.meta.env.VITE_API_URL;

let token = localStorage.getItem("token");

export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem("token", token);
};

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error("Registration failed");
  const data = await res.json();
  setToken(data.token);
  return data;
};
