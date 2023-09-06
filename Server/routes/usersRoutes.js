const express = require("express");
const verifyToken = require("../middleware/AuthMiddleware");
const {getUsers} = require("../controlers/UsersControler");

const router = express.Router();

router.get('/getUsers',getUsers)

router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You are authorized to access this route" });
});

module.exports = router;