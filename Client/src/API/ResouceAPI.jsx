import api from "./baseUrl.jsx";

export const uploadResource = async (data) => {
  try {
    const response = await api.post("/uploads", data);
    return response.data;
  } catch (error) {
    console.error("Error uploading resource:", error);
    throw error;
  }
};

export const createResource = async (data) => {
  try {
    const response = await api.post("/resources", data);
    console.log("Created:", response);
    return response;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
};

export const deleteResource = async (id) => {
  try {
    const response = await api.delete(`/resources/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting resource:", error);
    throw error;
  }
};

export const updateResource = async (id, data) => {
  try {
    const response = await api.put(`/resources/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating resource:", error);
    throw error;
  }
};

export const getResource = async (id) => {
  try {
    const response = await api.get(`/resources/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting resource:", error);
    throw error;
  }
};

export const getResources = async () => {
  try {
    const response = await api.get("/resources");
    return response.data;
  } catch (error) {
    console.error("Error getting resources:", error);
    throw error;
  }
};
