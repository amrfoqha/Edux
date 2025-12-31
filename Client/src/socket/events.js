export const EVENTS = Object.freeze({
  USER_STATUS: "user:status",
  PRESENCE_SNAPSHOT: "presence:snapshot",

  DM_NOTIFICATION: "dm:notification",
  DM_SEND: "dm:send",
  DM_RECEIVE: "dm:receive",
  JOIN_DM: "join:dm",
  LEAVE_DM: "leave:dm",

  JOIN_ROOM: "room:join",
  LEAVE_ROOM: "room:leave",
  ROOM_SEND: "room:send",
  ROOM_RECEIVE: "room:receive",
  ROOM_NOTIFICATION: "room:notification",

  REQUEST_NOTIFICATION: "request:notification",
});
