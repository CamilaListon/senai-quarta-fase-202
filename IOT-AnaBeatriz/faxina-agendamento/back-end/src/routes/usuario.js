import express from "express";
import { createUser } from "../controller/usuarioController.js";


const router = express.Router();
router.post("/usuario", createUser)

export default router;