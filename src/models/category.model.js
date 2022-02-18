const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CATEGORIES = [
  "pizzas",
  "hamburguesas",
  "sandwiches",
  "hot dogs",
  "empanadas",
  "acompañantes",
  "bebidas",
  "bebidas alcoholicas",
  "ensaladas",
  "pollo frito",
  "asado",
  "picadas",
  "burritos",
  "tacos",
  "sushi",
  "postres",
  "lomitos",
  "combo",
  "elaborados",
  "otros",
];

const categorySchema = new Schema(
  {
    name: { type: String, require: true, trim: true, lowercase: true },
    quantity: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
categorySchema.statics.decrementCategoryProducts = function (categoryName) {
  this.findOneAndUpdate(
    { name: categoryName },
    { $inc: { quantity: -1 } },
    { new: true }
  );
};
categorySchema.statics.incrementCategoryProducts = function (categoryName) {
  this.findOneAndUpdate(
    { name: categoryName },
    { $inc: { quantity: 1 } },
    { new: true }
  );
};
const Category = mongoose.model("Category", categorySchema);

module.exports = { Category, CATEGORIES };
