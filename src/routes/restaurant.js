import { Router } from "express";
import { createRestaurant, deleteRestaurant, getRestaurant, getRestaurants, updateRestaurant } from "../controllers/restaurant.js";

const router = Router();

router.post("/", createRestaurant);
router.get("/:id", getRestaurant);
router.get("/", getRestaurants)
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
