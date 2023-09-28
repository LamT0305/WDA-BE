import { Request, Response } from "express";
import orderModel from "../model/order.model";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerName, phone, address, quantity, product } = req.body;
    if (!customerName || !phone || !address || !quantity || !product) {
      throw new Error("Invalid input");
    }

    await orderModel.create({
      customerName: customerName,
      phone: phone,
      address: address,
      quantity: quantity,
      product: product,
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
    const page = req.query.page ? parseInt(req.query.page as string) : 1; // Current page number
    const pageSize = 20;

    // Calculate the number of documents to skip
    const skip = (page - 1) * pageSize;

    // Create the aggregation pipeline to retrieve paginated data
    const pipeline = [{ $skip: skip }, { $limit: pageSize }];

    // Count the total number of documents matching the query
    const totalDocuments = await orderModel.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalDocuments / pageSize);

    // Execute the aggregation query
    const orders = await orderModel.aggregate(pipeline);

    res.send({
      status: "success",
      orders: orders,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
