require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const path = require('path');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/songs");
const playListRoutes = require("./routes/playlist");
const searchRoutes = require("./routes/search");
const app = express();

connection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
app.use(express.static("public"));
app.use("/users/", userRoutes);
app.use("/api/", authRoutes);
app.use("/api/songs/", songRoutes);
app.use("/api/playlists/", playListRoutes);
app.use("/api/", searchRoutes);

const port = process.env.PORT || 8003;
app.listen(port, () => console.log(`Listening on port ${port}...`));