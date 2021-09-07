require("./db/mysql");
const express = require("express");
var app = express();
const userRoutes = require("./routes/userRoutes");
app.use(express.json());
// Routes
app.use("/user", userRoutes);

///--------------------------------

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
