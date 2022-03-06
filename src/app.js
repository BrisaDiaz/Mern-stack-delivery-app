const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: ".env" });
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("tiny"));

const productsRouter = require("./routes/products.js");
const usersRouter = require("./routes/users.js");
const authRouter = require("./routes/auth.js");
const contactRouter = require("./routes/contact.js");
const newsletterRouter = require("./routes/newsletter.js");
const ordersRouter = require("./routes/orders.js");
const categoriesRouter = require("./routes/categories.js");

app.use("/media", express.static(path.join(__dirname, "storage", "media")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get(" * ", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "../frontend")));
}

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/contact", contactRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/categories", categoriesRouter);

module.exports = app;
