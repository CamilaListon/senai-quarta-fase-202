import express from "express";
import { createUser } from "../controller/usuarioController.js";

const routerUser = express.Router();

routerUser.post("/usuario", createUser);

export default routerUser;
