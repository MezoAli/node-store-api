const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const searchOptions = {};
  const name = req.query.name;
  const company = req.query.company;
  const featured = req.query.featured;
  const page = req.query.page;
  const sort = req.query.sort;
  const fields = req.query.fields;
  const numericFilters = req.query.numericFilters;
  const currentPageNumber = Number(page) || 1;
  const productsPerPage = Number(req.query.limit) || 10;
  const skip = productsPerPage * (currentPageNumber - 1);
  if (name) {
    searchOptions.name = { $regex: name, $options: "i" };
  }
  if (company) {
    searchOptions.company = { $regex: company, $options: "i" };
  }
  if (featured) {
    searchOptions.featured = featured === "true" ? true : false;
  }
  let select;
  if (fields) {
    select = fields.split(",").join(" ");
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        searchOptions[field] = { [operator]: Number(value) };
      }
    });
  }
  let result = Product.find(searchOptions)
    .limit(productsPerPage)
    .skip(skip)
    .select(select)
    .sort();

  if (sort) {
    const sortedList = sort.split(",").join(" ");
    console.log(sort);
    console.log(sortedList);
    result = result.sort(sortedList);
  } else {
    result = result.sort("createdAt");
  }

  const allProducts = await result;

  res.status(200).json({
    success: true,
    length: allProducts.length,
    currentPageNumber,
    data: allProducts,
  });
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
