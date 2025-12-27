import api from "./baseUrl.jsx";

// Get current authenticated user
export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

// Get all users
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Get user by ID
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Create new user (register)
export const createUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login user
export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  console.log(response.data);
  return response.data;
};

// Update user
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
