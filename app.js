const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
require("express-async-errors");
const productsRouter = require("./routes/products");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();
app.use(express.json());
app.use("/api/v1/products", productsRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
