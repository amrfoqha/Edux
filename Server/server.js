const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const socketHandler = require("./socket");

require("dotenv").config();

const port = process.env.PORT;

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());

require("./config/mongoose.config");

const userRoutes = require("./routes/user.routes");

app.use("/api/users", userRoutes);
app.use("/api/resources", require("./routes/resource.routes"));
app.use("/api/rooms", require("./routes/room.routes"));
app.use("/api/room-members", require("./routes/room_member.routes"));
app.use("/api/room-messages", require("./routes/room_message.routes"));
app.use("/api/chats", require("./routes/chat.routes"));
app.use("/api/favorites", require("./routes/favorite.routes"));
app.use("/api/notifications", require("./routes/notification.routes"));
app.use("/api/reviews", require("./routes/review.routes"));
app.use("/api/resource-requests", require("./routes/resource_request.routes"));
require("./routes/auth.routes")(app);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.set("io", io);

socketHandler(io);

server.listen(port, () => console.log(`Listening on port: ${port}`));
