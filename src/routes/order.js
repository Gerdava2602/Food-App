import { Router } from "express";
import {
  acceptOrder,
  createOrder,
  deleteOrder,
  getInProgressOrders,
  getNotAcceptedOrders,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/order.js";

const router = Router();

router.post("/", createOrder);
router.post("/:id", acceptOrder);
router.get("/notAccepted", getNotAcceptedOrders);
router.get("/in-progress", getInProgressOrders);
router.get("/:id", getOrder);
router.get("/", getOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
