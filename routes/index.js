const express = require("express");
const imageRoutes = require("./images.routes.js")
const userRoutes= require("./user.routes.js");
const developerRoutes = require("./developer.routes.js")


const router = express.Router();

router.use("/users", userRoutes);
router.use("/devs", developerRoutes);
router.use("/images", imageRoutes);


module.exports = router;
