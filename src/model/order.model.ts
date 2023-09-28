import mongoose, { Schema } from "mongoose";
import IOrder from "../interface/order.interface";

const orderSchema = new Schema<IOrder>(
  {
    product: {
      type: "string",
      required: true,
    },
    customerName: {
      type: "string",
      required: true,
    },
    phone: {
      type: "string",
      required: true,
    },
    address: {
      type: "string",
      required: true,
    },
    quantity: {
      type: "number",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model<IOrder>("orders", orderSchema);

export default orderModel;
