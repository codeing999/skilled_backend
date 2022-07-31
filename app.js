import express from "express";

import routes from "./routes/routers/index.js";

const app = express();
const port = 4000;


app.use("/", routes);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
