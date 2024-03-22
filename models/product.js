const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter valid name"],
      minlength: [4, "name should be at least 4 characters"],
      maxlength: [20, "name should be less than 20 characters"],
    },
    company: {
      type: String,
      required: [true, "Please enter valid company"],
      minlength: [3, "company name should be at least 4 characters"],
      maxlength: [20, "company name should be less than 20 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter price"],
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
