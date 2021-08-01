//BMI Config Values
const bmiConfigValues = {
  "18.4": ["Malnutrition risk", "Underweight", "18.4 - below"],
  "24.9": ["Low risk", "Normal weight", "18.5 - 24.9"],
  "29.9": ["Enhanced risk", "Overweight", "25 - 29.9"],
  "34.9": ["Medium risk", "Moderately obese", "30 - 34.9"],
  "39.9": ["High risk", "Severely obese", "35 - 39.9"],
  "40": ["Very high risk", "Very severely obese", "40 - above"]
};

//Doing so that it should be in memory to serve all the requests in one go.
const bmiConfigKeys = Object.keys(bmiConfigValues)
  .map(key => parseFloat(key))
  .sort();

// Here we are calculating providing the BMI output with the same req by adding the required columns.
// If required if we can save the values in any database (RDBMS or NoSql) from here.
const calculateAndPutBmiValues = bmiDocParam => {
  //{"Gender": "Male", "HeightCm": 171, "WeightKg": 96 }
  let bmi = getBmiValueUsingFormula(bmiDocParam);
  let bmiCategoryObject = getBmiCategory(bmi);
  bmiDocParam.bmiValue = bmi;
  bmiDocParam.healthRisk = bmiCategoryObject[0];
  bmiDocParam.bmiCategory = bmiCategoryObject[1];
};

//Formula execution to get the BMI values
const getBmiValueUsingFormula = bmiDocParam => {
  let HeightMt = bmiDocParam.HeightCm / 100;
  let WeightKg = bmiDocParam.WeightKg;
  let bmi = WeightKg / (HeightMt * HeightMt);

  return bmi.toFixed(1);
};

//Calculate the category by using the bmiConfig values.
const getBmiCategory = bmi => {
  let result = "";
  for (const val of bmiConfigKeys) {
    if (bmi <= val) {
      result = bmiConfigValues[val.toString()];
      break;
    }
  }
  if (!result)
    result =
      bmiConfigValues[bmiConfigKeys[bmiConfigKeys.length - 1].toString()];
  return result;
};

const bmiCalculateService = (req, res) => {
  for (let bmiDocParam of req.body) {
    calculateAndPutBmiValues(bmiDocParam);
  }
  //console.log(req.body);
  res.json(req.body);
};

const bmiOverWeightService = (req, res) => {
  let overWeightCnt = 0;
  for (let bmiDocParam of req.body) {
    let bmi = getBmiValueUsingFormula(bmiDocParam);
    let bmiCategoryObject = getBmiCategory(bmi);
    if (bmiCategoryObject[1] == "Overweight") overWeightCnt++;
  }
  res.json({ totalOverWeightCnt: overWeightCnt });
};

module.exports = { bmiCalculateService, bmiOverWeightService };
