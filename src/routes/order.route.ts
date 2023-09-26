import { Router } from "express";

import { createOrder, viewAllOrders } from "../controller/order.controller";

const router: Router = Router();

router.get("/", viewAllOrders);
router.post("/", createOrder);

export default router;
