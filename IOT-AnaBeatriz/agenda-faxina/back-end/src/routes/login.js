import express from "express";
import { login } from "../controller/loginController.js";

const routerLogin = express.Router();

routerLogin.post("/login", login);

export default routerLogin;