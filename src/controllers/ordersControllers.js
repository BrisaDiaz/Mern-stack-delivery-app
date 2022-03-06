const mongoose = require("mongoose");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const { Order } = require("../models/order.model");
const orderFactory = require("../utils/orderGenerator");
const { orderEmitter } = require("../config/io");

const getAllOrders = async (req, res) => {
  let query = {};
  let sort = "-createdAt";
  let page = 1;
  let limit = 5;

  if (req.query.orderID) {
    query.orderID = parseInt(req.query.orderID);
  }
  if (req.query.state) {
    if (req.query.state === "finish") {
      query.finished = true;
    }
    if (req.query.state === "unfinished") {
      query.finished = false;
    }
  }
  if (req.query.sort) {
    sort = req.query.sort;
  }
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  let skip = (page - 1) * limit;

  try {
    const orders = await Order.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate("client")
      .exec();
    const totalResults = await Order.find(query);

    return res
      .status(200)
      .json({ successful: true, data: orders, total: totalResults.length });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Something went wrong, couldn't get orders",
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderFound = await Order.findById(req.params.id)
      .populate("client")
      .exec();

    return res.status(200).json({ successful: true, data: orderFound });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, the state couldn't get order",
    });
  }
};

const getAllUserOrders = async (req, res) => {
  let sort = "-createdAt";
  let page = 1;
  let limit = 5;

  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  let skip = (page - 1) * limit;

  try {
    const user = await User.findById(req.params.userId);

    const ordersFound = await Order.find({ _id: { $in: user.orders } })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate("client")
      .exec();

    return res.status(200).json({
      successful: true,
      data: ordersFound,
      total: user.orders.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong,  couldn't get user orders",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const orderResume = req.body;
    if (!orderResume || orderResume.length < 1)
      return res
        .status(400)
        .json({ successful: false, message: "Order is empty!" });

    const promises = orderResume.map((field) =>
      Product.findById(field.productId)
    );

    const productsFound = await Promise.all(promises);

    const areAllProductsFound = productsFound.every(Boolean);

    if (!areAllProductsFound)
      return res
        .status(404)
        .json({ successful: false, message: "No products found" });

    const clientFound = await User.findById(req.userId);

    const orderId = mongoose.Types.ObjectId();

    const order = orderFactory({
      productsData: productsFound,
      quantitySpecifications: orderResume,
      clientId: req.userId,
      orderId: orderId,
    });

    const newOrder = new Order(order);

    newOrder.createStates();

    await newOrder.save();
    await clientFound.addOrder(orderId).save();

    ///socket io notification to admins

    orderEmitter.emit("newOrder", newOrder);

    return res
      .status(201)
      .json({ success: true, message: "Order created successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong, order couldn't be created",
    });
  }
};

const actualizeOrderState = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const clientFound = await User.findById(order.client[0]);

    order.updateOrderState(req.confirmedState);

    if (req.confirmedState === "liquidado") {
      order.closeOrder();
      clientFound.setIsClient();

      const promises = order.description.map((item) =>
        Product.incrementProductSales(item.name, item.quantity)
      );

      try {
        await Promise.all(promises);
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message:
            "Something went wrong, the product sold quantity could not be updated",
        });
      }
    }

    await order.save();
    await clientFound.save();
    // notify user about an order actualization
    orderEmitter.emit("orderActualization", clientFound._id, order);

    return res
      .status(200)
      .json({ success: false, message: "order state updated successfully" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Something went wrong, the state couldn't be upgraded",
    });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.orderId);

    const clientFound = await User.findById(req.userId);

    clientFound.deleteOrder(req.orderId).save();

    return res
      .status(204)
      .json({ success: true, message: "Order has been deleted" });
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ success: false, message: "Order couldn't been deleted" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  actualizeOrderState,
  deleteOrderById,
  getAllUserOrders,
};
