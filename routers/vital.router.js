const express = require("express");
const router = express.Router();
const bmictl = require("../controllers/bmicalculator.controller");

//defining middle ware for testing
router.use(function timeLog(req, res, next) {
  console.log("Vital router initialisation with time ", Date.now());
  next();
});

router.post("/calculatebmi", bmictl.calculateBmi);

router.post("/countoverweight", bmictl.countOverWeight);
module.exports = router;
