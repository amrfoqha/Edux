import api from "./baseUrl.jsx";

/* ================= USER ================= */

// Get current authenticated user
export const getCurrentUser = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

// Get all users
export const getAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

// Get user by ID
export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

// Update user
export const updateUser = async (id, userData) => {
  const res = await api.patch(`/users/${id}`, userData);
  return res.data;
};

// Delete user
export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

// Register
export const createUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

// Login
export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

// Authentication
export const refreshAccessToken = async (refreshToken) => {
  const res = await api.post("/auth/refresh", { refreshToken });
  return res.data;
};

export const getUserResourcesPage = async (id, page, limit) => {
  try {
    const res = await api.get(
      `/users/${id}/resources/page?page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
