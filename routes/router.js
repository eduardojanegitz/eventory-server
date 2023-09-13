import express from "express";
import item from "./item.js";
import user from "./user.js";
import movement from "./movement.js";
import inventory from "./inventory.js";
import cost from "./cost.js";
import auth from "./auth.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/", item);
router.use("/", user);
router.use("/", movement);
router.use("/", inventory);
router.use("/", cost);
router.use("/", auth);

export default router;
