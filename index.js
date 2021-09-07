require("./db/mysql");
const express = require("express");
var app = express();
const userRoutes = require("./routes/userRoutes");

// Routes
app.use("/user", userRoutes);

///--------------------------------

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
