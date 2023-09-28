import { Request, Response } from "express";
import orderModel from "../model/order.model";
import { Aggregate } from "mongoose";

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

export const getAllOrdersSortedDate = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Page number, default to 1
    const perPage = 20; // Items per page, default to 10
    const sort = parseInt(req.query.sort as string);
    const skip = (page - 1) * perPage;

    // Create a query to retrieve paginated and sorted data
    const query = orderModel
      .find()
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: sort == 1 ? 1 : -1 }); // -1 : newest first, 1 : oldest first

    // Execute the query to retrieve paginated and sorted orders
    const sortedOrders = await query.exec();

    // Count the total number of documents matching the query
    const total = await orderModel.countDocuments();

    res.status(200).json({
      status: "success",
      orders: sortedOrders,
      currentPage: page,
      totalPages: Math.ceil(total / perPage),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getAllOrdersSortedQuantity = async (
  req: Request,
  res: Response
) => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Page number, default to 1
    const perPage = 20; // Items per page, default to 10
    const skip = (page - 1) * perPage;
    const quantity = parseInt(req.query.quantity as string);

    // Create a query to retrieve paginated and sorted data
    const query = orderModel
      .find()
      .skip(skip)
      .limit(perPage)
      .sort({ quantity: quantity == -1 ? -1 : 1 }); // -1 : most, 1 : least

    // Execute the query to retrieve paginated and sorted orders
    const sortedOrders = await query.exec();

    // Count the total number of documents matching the query
    const total = await orderModel.countDocuments();

    res.status(200).json({
      status: "success",
      orders: sortedOrders,
      currentPage: page,
      totalPages: Math.ceil(total / perPage),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const deleteOrderById = async (req: Request, res: Response) => {
  try {
    const isExist = await orderModel.findById(req.params.id);
    if (!isExist) {
      res.status(404).json({ status: "error", message: "order not found!" });
    }

    await orderModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: "success", message: "Order deleted successfully!" });
  } catch (e) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
