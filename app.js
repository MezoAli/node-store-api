const express = require("express");
require("dotenv");
const productsRouter = require("./routes/products");

const app = express();
app.use("/api/v1/products", productsRouter);
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
