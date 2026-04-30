import { api } from "./api";

export async function login(email, senha) {
  const res = await api.post("/login", { email, senha });
  localStorage.setItem("token", res.data.token);
}

export function logout() {
  localStorage.removeItem("token");
}