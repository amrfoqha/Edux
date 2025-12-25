const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const port = process.env.PORT;

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());

require("./config/mongoose.config");

require("./routes/user.routes")(app);
require("./routes/resource.routes")(app);
require("./routes/room.routes")(app);
require("./routes/room_member.routes")(app);
require("./routes/room_message.routes")(app);
require("./routes/chat.routes")(app);
require("./routes/favorite.routes")(app);
require("./routes/notification.routes")(app);
require("./routes/review.routes")(app);
require("./routes/resource_request.routes")(app);
require("./routes/auth.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
