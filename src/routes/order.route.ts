import { Router } from "express";

import {
  createOrder,
  viewAllOrders,
  getAllOrdersSortedDate,
  getAllOrdersSortedQuantity,
  deleteOrderById,
} from "../controller/order.controller";

const router: Router = Router();

router.get("/", viewAllOrders);
router.post("/", createOrder);
router.get("/sorted-by-date-newest", getAllOrdersSortedDate);
router.get("/sorted-by-quantity", getAllOrdersSortedQuantity);
router.delete("/:id", deleteOrderById);

export default router;
