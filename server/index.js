require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const path = require('path');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");
const playListRoutes = require("./routes/playlist");
const searchRoutes = require("./routes/search");
const app = express();

connection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));
app.use(express.static("public"));
app.use("/users", userRoutes);
app.use("/", authRoutes);
app.use("/movie", movieRoutes);
app.use("/playlists", playListRoutes);
app.use("/api", searchRoutes);

const port = process.env.PORT || 8003;
app.listen(port, () => console.log(`Listening on port ${port}...`));