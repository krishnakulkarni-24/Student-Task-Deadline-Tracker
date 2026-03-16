import api from "./api";

export const register = (data) => {
  return api.post("/api/auth/register", data);
};

export const login = (email, password) => {
  return api.post("/api/auth/login", {
      email: email,
      password: password,
  });
};