import { Router } from "express";
import { createOrder, deleteOrder, getNotAcceptedOrders, getOrder, getUserOrders, updateOrder } from "../controllers/order.js";

const router = Router();

router.post("/", createOrder);
router.get('/notAccepted', getNotAcceptedOrders)
router.get("/:id", getOrder);
router.get("/user/:userid", getUserOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;