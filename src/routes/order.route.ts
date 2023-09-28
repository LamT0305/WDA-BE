import { Router } from "express";

import {
  createOrder,
  getAllOrdersSortedDate,
  getAllOrdersSortedQuantity,
  deleteOrderById,
  updateOrderStatus,
} from "../controller/order.controller";

const router: Router = Router();

router.post("/", createOrder);
router.get("/sorted-by-date-newest", getAllOrdersSortedDate);
router.get("/sorted-by-quantity", getAllOrdersSortedQuantity);
router.delete("/:id", deleteOrderById);
router.put("/update-status/:id", updateOrderStatus)


export default router;
