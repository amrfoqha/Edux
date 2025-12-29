import api from "./baseUrl.jsx";

export const addToFavoriteResource = async (resourceId, userId) => {
  try {
    const response = await api.post(`/favorites/`, {
      resource: resourceId,
      user: userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};

export const removeFromFavoriteResource = async (data) => {
  console.log(data.resourceId);
  const resourceId = data.resourceId;
  const userId = data.userId;
  try {
    const response = await api.delete(`/favorites/${resourceId}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
};

export const getAllFavoritesByUserId = async (userId) => {
  try {
    const response = await api.get(`/favorites/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting favorites:", error);
    throw error;
  }
};
