const express = require("express");

const router = express.Router();

const {
  addProdcut,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} = require("../controllers/products");

router.get("/", getAllProducts);
router.post("/", addProdcut);
router.get("/:id", getSingleProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
