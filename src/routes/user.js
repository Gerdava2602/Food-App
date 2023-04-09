import { Router } from "express";
import { createUser, deleteUser, getUser, updateUser } from "../controllers/user.js";

const router = Router();

router.get("/", getUser)
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;