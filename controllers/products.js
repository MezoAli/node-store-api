const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const allProducts = await Product.find({});
  res.status(200).json({ success: true, data: allProducts });
};
const addProdcut = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
};
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  res.send(`update prodcut id: ${id} and data of ${data}`);
};
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  res.send(`delete prodcut id: ${id}`);
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
