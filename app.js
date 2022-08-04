const express = require("express");

const routes = require("./routes/routers/index.js");

const app = express();
const port = 4000;

app.use(express.json());  //JSON형태의 데이터를 해석
app.use(express.urlencoded({ extended: true })); //x-www-form-urlencoded형태의 데이터를 해석

app.use("/", routes);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
