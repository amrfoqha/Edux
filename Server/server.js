const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const port = process.env.PORT;

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());

require("./config/mongoose.config");

app.listen(port, () => console.log(`Listening on port: ${port}`));
