const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const searchOptions = {};
  const name = req.query.name;
  const company = req.query.company;
  if (name) {
    searchOptions.name = { $regex: name, $options: "i" };
  }
  if (company) {
    searchOptions.company = { $regex: company, $options: "i" };
  }
  const allProducts = await Product.find(searchOptions);
  res
    .status(200)
    .json({ success: true, length: allProducts.length, data: allProducts });
};
const addProdcut = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
};
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({ success: true, data: product });
};
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  await Product.findByIdAndDelete(id);
  res.status(201).json({ success: true, msg: "Product deleted successfully" });
};
const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    throw new Error(`can't find product with id ${id}`);
  }
  res.status(200).json({ success: true, data: product });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  addProdcut,
};
