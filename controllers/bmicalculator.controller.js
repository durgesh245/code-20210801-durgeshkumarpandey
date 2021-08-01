const vitalService = require("../services/vital.services");

const calculateBmi = (req, res) => {
  //console.log("This is the received data ");
  //console.log(req.body);
  vitalService.bmiCalculateService(req, res);
};

const countOverWeight = (req, res) => {
  //console.log("This is the received data ");
  //console.log(req.body);
  vitalService.bmiOverWeightService(req, res);
};

module.exports = { calculateBmi, countOverWeight };
