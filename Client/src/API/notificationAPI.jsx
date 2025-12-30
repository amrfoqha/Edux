import api from "./baseUrl.jsx";

export const getUnReadNotifications = async (userId) => {
  try {
    const res = await api.get(`/notifications/unread/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const toggleNotificationRead = async (notificationId, isRead = true) => {
  try {
    const res = await api.patch(`/notifications/${notificationId}`, {
      isRead,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
