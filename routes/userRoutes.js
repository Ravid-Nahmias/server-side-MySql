const express = require("express");
const { createUser, getUser, updateUser, deleteUser } = require("./user");

const router = express.Router();

router.post("/", createUser);
router.get("/", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
