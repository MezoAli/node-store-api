const getAllProducts = async (req, res) => {
  res.send("get all procuts");
};
const addProdcut = async (req, res) => {
  const data = req.body;
  res.send("add prodcut" + data);
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
  res.send(`get single prodcut with id ${id}`);
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  addProdcut,
};
