import api from "./baseUrl.jsx";

export const addReview = async (reviewData) => {
  try {
    const response = await api.post("/reviews", reviewData);
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const getReviewsByResourceId = async (resourceId) => {
  try {
    const response = await api.get(`/reviews/resource/${resourceId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
