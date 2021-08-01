const express = require("express");
const app = express();
const port = 3000;
//const port = process.env.NODE_APP_PORT; //Port defined in environment variable
app.use(express.json());
const vital = require("./routers/vital.router");
app.use("/vital", vital);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
