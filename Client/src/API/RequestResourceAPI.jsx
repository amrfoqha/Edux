import api from "./baseUrl";

export const createRequestResource = async (resource, owner, requestor) => {
  try {
    const res = await api.post("/resource-requests", {
      resource,
      owner,
      requestor,
    });
    return res.data;
  } catch (error) {
    console.error("Error in creating new Request :", error);
  }
};

export const getResourceStatus = async (resourceId, user) => {
  try {
    const res = await api.get(
      `/resource-requests/status/${resourceId}/${user}`
    );
    return res.data.status;
  } catch (error) {
    console.error("Error in getting resource status :", error);
  }
};

export const getUserRequests = async (userId) => {
  try {
    const res = await api.get(`/resource-requests/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error in getting user requests :", error);
  }
};

export const approveRequest = async (requestId) => {
  try {
    const res = await api.patch(`/resource-requests/${requestId}`, {
      status: "approved",
    });
    return res.data;
  } catch (error) {
    console.error("Error approving request:", error);
  }
};

export const declineRequest = async (requestId) => {
  try {
    const res = await api.patch(`/resource-requests/${requestId}`, {
      status: "rejected",
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error declining request:", error);
  }
};
