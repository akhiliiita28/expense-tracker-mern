const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const {getDashboardData}= require("../controllers/dasdhboardController")


const router = express.Router();


router.get("/", protect, getDashboardData);
router.get("/get", protect, getDashboardData);



module.exports = router;
