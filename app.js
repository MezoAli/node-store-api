const express = require("express");
require("dotenv");
const productsRouter = require("./routes/products");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();
app.use("/api/v1/products", productsRouter);
app.use(express.json());

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
