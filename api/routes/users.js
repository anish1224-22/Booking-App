import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userControl.js";
import  {verifyAdmin, verifyToken, verifyUser}  from "../utils/verifyToken.js";

const router = express.Router();

router.post("/",createUser)

router.put("/:id", verifyUser,updateUser);

router.delete("/:id", verifyUser,deleteUser);
router.get("/:id", verifyUser,getUser);
router.get("/", verifyAdmin,getAllUsers);
export default router;