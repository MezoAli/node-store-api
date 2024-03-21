const express = require("express");
require("dotenv");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
