const express = require("express"),
  cors = require("cors");
require("./db/mysql");
const app = express();

const userRoutes = require("./routes/userRoutes");
app.use(express.json());

app.use(cors());
app.options("*", cors());

///--------------------------------

const port = 3000;
// Routes
app.use("/user", userRoutes);
app.listen(port, () => console.log(`Listening on port ${port}..`));
