const mongoose = require("mongoose");
const Category = require("./category.model");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true, lowercase: true, trim: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true, lowercase: true, trim: true },
    size: { type: String, required: true },
    description: { type: String, required: true, lowercase: true, trim: true },
    img: { type: String, trim: true },
    img_id: { type: String, trim: true },
    active: { type: Boolean, required: true, default: true },
    sold: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.statics.incrementProductSales = function (productName, quantity) {
  this.findOneAndUpdate(
    { name: productName },
    { $inc: { sold: quantity } },
    { new: true }
  );
};
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
