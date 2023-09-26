import { Request, Response } from "express";
import orderModel from "../model/order.model";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerName, phone, address, quantity } = req.body;
    if (!customerName || !phone || !address || !quantity) {
      throw new Error("Invalid input");
    }

    await orderModel.create({
      customerName: customerName,
      phone: phone,
      address: address,
      quantity: quantity,
    });

    res
      .status(200)
      .json({ status: "success", message: "Created order successfully!" });
  } catch (e: any) {
    console.error(e); // Log the error
    res.status(500).json({ message: e.message }); // Send the error message
  }
};

export const viewAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.find();
    res.send({ status: "success", orders: orders });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
