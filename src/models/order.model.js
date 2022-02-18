const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const STATES = ["enviado", "aceptado", "despachado", "entregado", "liquidado"];

const orderSchema = new Schema(
  {
    orderID: { type: Number, default: Date.now },

    client: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    description: [
      {
        product: {
          name: { type: String, require: true, trim: true, lowercase: true },
          price: { type: Number, default: 0 },
        },
        quantity: { type: Number, default: 1 },
        total: { type: Number, default: 0 },
      },
    ],

    total: { type: Number, default: 0 },

    states: [
      {
        name: { type: String, default: "" },
        confirmed: { type: Boolean, default: false },
        date: { type: Date },
      },
    ],
    finished: { type: Boolean, default: false },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

orderSchema.methods.createStates = function createStates() {
  this.states = STATES.map((state) => {
    if (state === "enviado")
      return { name: state, confirmed: true, date: Date.now() };

    return { name: state, confirmed: false };
  });

  return this;
};

orderSchema.methods.updateOrderState = function (confirmedState) {
  const updatedStates = this.states.map((state) => {
    if (state.name === confirmedState) {
      return { name: confirmedState, date: Date.now(), confirmed: true };
    } else {
      return state;
    }
  });
  this.states = updatedStates;
  return this;
};
orderSchema.methods.closeOrder = function () {
  this.finished = true;
  return this;
};

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, STATES };
